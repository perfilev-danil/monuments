# === БАЗОВЫЙ ОБРАЗ ДЛЯ СБОРКИ ===
FROM node:18-alpine AS base

# Устанавливаем необходимые зависимости
RUN apk add --no-cache libc6-compat python3 g++ make

# === СБОРКА ПРОЕКТА ===
FROM base AS builder

WORKDIR /app

# Копируем package.json и lock-файл
COPY package.json pnpm-lock.yaml ./

# Устанавливаем pnpm
RUN npm install -g pnpm

# Настройка кэша для pnpm
RUN pnpm config set store-dir /root/.pnpm-store

# Установка зависимостей
RUN pnpm install

# Копируем оставшийся код проекта
COPY . .

# Генерация Prisma клиента
RUN pnpm exec prisma generate

# Установка переменных окружения (если нужно)
ARG NEXT_PUBLIC_URL
ARG DATABASE_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Сборка проекта
RUN pnpm build

# === ФИНАЛЬНЫЙ ОБРАЗ ДЛЯ ПРОДАКШНА ===
FROM base AS runner

WORKDIR /app

# Production mode
ENV NODE_ENV=production

# Добавляем пользователя без root-доступа
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

RUN npm install -g pnpm

# Копируем нужные директории из билдера
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Копируем переменные окружения (если передаются через ARG)
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Назначаем права пользователю
RUN chown -R nextjs:nodejs /app

# Используем непривилегированного пользователя
USER nextjs

# Открываем порт
EXPOSE 3000


CMD ["sh", "-c", "pnpm db:deploy && pnpm start"]


