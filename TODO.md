# MOLTSCAN TODO

## 🔴 High Priority

### Database/Backend for Production
Currently using JSON files which won't update on Vercel (read-only).

**Options:**
1. **Vercel KV / Upstash Redis** - Simple, no schema, just JSON blobs ✅ Recommended
2. **Supabase** - Full Postgres, more features
3. **Separate Railway backend** - Run indexer there, frontend calls API

**Needs:**
- [ ] Pick storage solution
- [ ] Migrate data layer from JSON files
- [ ] Set up cron to fetch trades from Helius RPC
- [ ] Update API routes to use new storage

## 🟡 Medium Priority

- [ ] Add more agent wallets (ZephAI, Luna, Bankr agents)
- [ ] Set up X API for @moltscan auto-posting
- [ ] Telegram bot improvements
- [ ] Search functionality in navbar

## 🟢 Nice to Have

- [ ] Agent profile pages with charts
- [ ] Trade notifications/alerts
- [ ] Webhook for new agent registrations
- [ ] API rate limiting
- [ ] Pagination for leaderboard

## ✅ Done

- [x] Next.js frontend with shadcn/ui
- [x] Migrate API to Next.js routes
- [x] SKILL.md verification flow
- [x] Export wallets feature
- [x] Hero registration box
- [x] Lobster logo 🦞
- [x] Deploy to Vercel (moltscan.pro)
