# Design Guidelines for تشاليح المحاكي Service Website

## Design Approach: Reference-Based (Gaming/Tech Services)
Drawing inspiration from modern gaming service platforms like Discord, Steam, and tech service providers, with Arabic language support and RTL layout considerations.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Background: 220 25% 8% (Dark navy base)
- Surface: 220 20% 12% (Card backgrounds)
- Primary Brand: 240 80% 60% (Discord-inspired blue)
- Text Primary: 0 0% 95% (Near white)
- Text Secondary: 0 0% 70% (Muted gray)

**Accent Colors:**
- Success: 140 65% 50% (For pricing highlights)
- Warning: 35 85% 55% (Call-to-action buttons)

**Gradients:**
- Hero gradient: Subtle dark blue to purple (240 80% 15% to 260 60% 20%)
- Service card hover effects with subtle brand color overlays

### Typography
**Fonts:**
- Primary: 'Cairo' or 'Tajawal' from Google Fonts (excellent Arabic support)
- Secondary: 'Inter' for Latin text and numbers
- Sizes: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
- Weights: font-normal, font-medium, font-semibold, font-bold

### Layout System
**Spacing Units:** Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2 (8px)
- Component spacing: p-4, gap-4 (16px)
- Section spacing: py-8, my-8 (32px)
- Large spacing: py-12, my-16 (48px-64px)

### Component Library

**Navigation:**
- Dark header with logo integration
- Discord server button prominently placed
- RTL-friendly navigation structure

**Service Cards:**
- Dark cards with subtle borders
- Hover effects with brand color accents
- Clear pricing display with SAR currency
- Service descriptions in Arabic
- Purchase buttons with invoice generation

**Forms & Interactions:**
- Invoice generation modal with unique order numbers
- Dark form inputs with proper contrast
- Loading states for order processing

**Footer:**
- Simple contact section with Discord username
- Copyright notice: "حقوق تشاليح المحاكي 2025"
- Minimal, clean design

## Images
**Logo Integration:**
- Place the provided تشاليح المحاكي logo prominently in the header
- Use as favicon and brand identifier throughout

**Hero Section:**
- Medium-sized hero (not full viewport) featuring the logo
- Dark gradient background with subtle gaming-inspired elements
- No large hero image - focus on branding and service clarity

**Service Icons:**
- Simple, consistent icons for each service type
- Use gaming/tech iconography (server icons, bot symbols)
- Maintain visual hierarchy with the logo as primary brand element

## Key Design Principles
- **Arabic-First Design:** Proper RTL layout with Arabic typography
- **Gaming Aesthetic:** Dark theme with tech-inspired colors
- **Service Clarity:** Clear pricing and service descriptions
- **Discord Integration:** Seamless connection to Discord community
- **Professional Simplicity:** Clean, focused design without unnecessary complexity