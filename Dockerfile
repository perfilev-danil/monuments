FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat python3 g++ make


FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm config set store-dir /root/.pnpm-store

RUN pnpm install

COPY . .

RUN pnpm exec prisma generate

ARG NEXT_PUBLIC_URL
ARG DATABASE_URL
ARG ADMIN_USERNAME
ARG ADMIN_PASSWORD
ARG JWT_SECRET

ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV DATABASE_URL=${DATABASE_URL}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}

RUN pnpm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

RUN npm install -g pnpm

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV DATABASE_URL=${DATABASE_URL}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000


#CMD ["sh", "-c", "pnpm db:deploy && pnpm start"]
CMD ["sh", "-c", "pnpm db:deploy && NODE_OPTIONS='--max-old-space-size=4096' pnpm start"]


