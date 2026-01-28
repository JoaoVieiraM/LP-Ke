# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Ke Barbearia** – a premium barbershop in São Paulo, Brazil. The project is currently in the design specification phase with detailed design documents but no source code yet.

**Business:** Premium barbershop at Rua Mazzini, 288 – São Paulo, SP. Contact: (11) 98451-4708, @kebarbearia on Instagram. Open Mon-Sat 9:40-21:00.

**Goal:** Single-page landing site to showcase premium services, professional brand image, and drive appointment bookings via Booksy integration.

## Design System

### Color Palette
- **Primary background:** #0A0A0A / #111111 (deep black)
- **Secondary background:** #151515 / #1C1C1C (dark gray)
- **Primary accent:** #FF5E00 / #FF6200 (vibrant orange) – used for CTAs, curves, prices, highlights
- **Text:** #FFFFFF / #F8F8F8 (white/off-white)
- **Secondary details:** #444444 (medium gray)

### Typography
- **Headings (hero/section):** Serif elegant (Playfair Display Black or Cinzel Decorative), 100-180px, uppercase
- **Subheadings (service names):** Sans-serif ultra-bold (Bebas Neue or Montserrat Black), 50-80px
- **Body text:** Clean sans-serif (Inter or Montserrat Regular), 18-22px
- **Prices/CTAs:** Orange bold sans-serif, 32-48px, uppercase

### Animation Requirements
- Fade-in + scale (0.8-1.2s duration) on scroll
- SVG path draw animation for orange curves (stroke-dasharray reveal)
- Hover effects: scale 1.05-1.1, orange border, subtle glow
- Parallax on hero and team photos (20-30% slower)
- CTA pulse animation (scale 1.02 every 4s)
- Recommended libraries: AOS or GSAP

## Page Structure

Single-page scroll layout with sections:
1. **Fixed navbar** – transparent → darkens on scroll, logo left, menu right, orange "Agendar Horário" CTA
2. **Hero** – full-width photo with black gradient overlay, large orange "KE BARBEARIA" title in curved SVG, white subtitle, CTA button
3. **Services** – asymmetric columns (2-4), orange connecting curves, service name + description + orange price
4. **Gallery** – horizontal slider with hover zoom + orange overlay
5. **Team** – large group photo with parallax, text overlay
6. **Differentials** – bullet list with orange icons
7. **Location/Contact** – address, hours, CTA
8. **Footer** – logo, social icons (Instagram/WhatsApp), copyright "Desde 2021"

## Services & Pricing

- Corte Masculino: R$50
- Barba: R$50
- Corte + Barba: R$95
- Corte + Sobrancelha: R$180
- Barba + Sobrancelha: R$180
- Pacote Completo: R$330

## Key Implementation Notes

- All booking CTAs link to Booksy (external, opens new tab)
- Mobile-first responsive: reduce hero text sizes (60-100px), simplify curves, vertical/swipe slider
- Logo includes sword/cross with wings motif – use as subtle watermarks (10% opacity) in section corners
- Smooth scroll behavior page-wide
- No heavy forms – focus on Booksy redirect

## Reference Files

- `Info.MD` – business details, services, pricing, contact info
- `Design.MD` – complete design specifications and layout guidelines
- `assets/` – reference images (team photo, design inspiration mockups)
