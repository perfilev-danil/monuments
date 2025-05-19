# Используем Node Alpine с нужными пакетами
FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat python3 g++ make

# Сборка проекта
FROM base AS builder

WORKDIR /app

# Копируем package.json и lock-файл для кеширования зависимостей
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# Устанавливаем кэш pnpm
RUN pnpm config set store-dir /root/.pnpm-store

RUN pnpm install

COPY . .

# Аргументы для переменных окружения (для Next.js)
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm build

# Финальный продакшн-образ
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем все из билдера
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV DATABASE_URL=${DATABASE_URL}

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]
