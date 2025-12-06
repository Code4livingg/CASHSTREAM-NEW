# FlowBeamHybrid Component - Quantum Waterfall Integration Guide

## Overview
The FlowBeamHybrid component creates a stunning "Quantum Waterfall Flow Beam" that combines fiber-optic micro-lines with droplet-like particles for an immersive crypto payment visualization.

## Visual Concept
Combines two effects:
1. **Quantum Filament Flow**: Thin fiber-optic micro-lines (2-4px width)
2. **Crypto Waterfall**: Droplet-like pulses swimming through the beam

## Color Palette
- **Neon Green Core**: `#35FF79`
- **Aqua Highlights**: `#00F6FF`
- **Black Chrome Background**: `#0A0F0D`

## Features
- ✅ 4 fiber-optic micro-lines with varying widths (2-3px)
- ✅ 8 waterfall droplets with random timing and acceleration
- ✅ Direction reverses based on user role (sender/receiver)
- ✅ Speed varies by interval (minute/hour/daily/monthly)
- ✅ GPU-friendly animations (no heavy blur)
- ✅ Responsive mobile-first design
- ✅ Reduced motion support
- ✅ Quantum glow overlay effects

## Installation
Already integrated into the Dashboard. No additional installation needed.

## Usage

### Basic Example
```tsx
import { FlowBeamHybrid } from '../components';

<FlowBeamHybrid
  sender="AU12CzXE7mHZSvRx..."
  receiver="AU34AbCdEf5gHiJk..."
  interval="hour"
  isSenderView={true}
  streamAmount="100"
/>
```

### With Real Stream Data
```tsx
// Determine if user is sender
const isSenderView = wallet.address === stream.sender;

// Map interval to type
const intervalType = stream.interval <= 60 ? 'minute' :
                     stream.interval <= 3600 ? 'hour' :
                     stream.interval <= 86400 ? 'daily' : 'monthly';

<FlowBeamHybrid
  sender={stream.sender}
  receiver={stream.receiver}
  interval={intervalType}
  isSenderView={isSenderView}
  streamAmount={stream.amount}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sender` | `string` | Yes | Sender wallet address |
| `receiver` | `string` | Yes | Receiver wallet address |
| `interval` | `'minute' \| 'hour' \| 'daily' \| 'monthly'` | Yes | Stream interval type |
| `isSenderView` | `boolean` | Yes | Whether logged-in wallet matches sender |
| `streamAmount` | `string` | Yes | Stream amount (display only, no math) |

## Speed Mappings

Flow speed is determined by the interval prop:

| Interval | Speed | Duration | Description |
|----------|-------|----------|-------------|
| `minute` | Ultra Fast | 0.6s | Rapid particle flow |
| `hour` | Fast | 1.2s | Quick movement |
| `daily` | Medium | 2.0s | Moderate pace |
| `monthly` | Slow | 3.5s | Leisurely flow |

## Direction Logic

The beam automatically reverses based on user role:
- **isSenderView = true**: Flow left → right (SENDING →)
- **isSenderView = false**: Flow right → left (← RECEIVING)

## Visual Elements

### Fiber-Optic Lines (4 lines)
- Spread vertically with 12px spacing
- Alternating widths (2px and 3px)
- Alternating colors (green and aqua)
- Animated energy pulses along each line
- Staggered timing (0.2s delay between lines)

### Waterfall Droplets (8 particles)
- Varying sizes (6-10px diameter)
- Spread vertically with 15px spacing
- Alternating colors (green and aqua)
- Random delay (0-0.45s)
- Random acceleration curves (easeInOut, easeIn, easeOut, linear)
- Scale animation (0.8 → 1.2 → 0.8)
- Opacity animation (0.6 → 1 → 0.6)

### Additional Effects
- Quantum glow overlay (radial gradient)
- Edge fiber highlights (top and bottom)
- Direction indicator text
- Speed/interval indicator
- Icon glow effects

## Dashboard Integration

The FlowBeamHybrid is integrated into the Dashboard's "Active Stream Flow" card:

```tsx
{/* Active Stream Flow Card with FlowBeamHybrid */}
<div className="card card-glow animate-fade-in-up">
  <div className="card-header">
    <h2 className="card-title">Active Stream Flow</h2>
    <span className="badge badge-success">Live</span>
  </div>
  
  <div className="card-body" style={{ padding: 0 }}>
    <FlowBeamHybrid
      sender={activeStream.sender}
      receiver={activeStream.receiver}
      interval={activeStream.interval}
      isSenderView={activeStream.isSenderView}
      streamAmount={activeStream.amount}
    />
    
    {/* Stream details below */}
  </div>
</div>
```

## Customization

### Adjusting Particle Count
Change the array length in the map functions:

```tsx
// More fiber lines (currently 4)
{[0, 1, 2, 3, 4, 5].map((lineIndex) => ...)}

// More droplets (currently 8)
{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dropletIndex) => ...)}
```

### Adjusting Colors
Edit the color constants:

```tsx
const lineColor = lineIndex % 2 === 0 ? '#35FF79' : '#00F6FF';
const dropletColor = dropletIndex % 3 === 0 ? '#35FF79' : '#00F6FF';
```

### Adjusting Speed
Modify the `getFlowSpeed` function:

```tsx
const getFlowSpeed = (interval: 'minute' | 'hour' | 'daily' | 'monthly'): number => {
  const speedMap = {
    minute: 0.4,   // Even faster
    hour: 1.0,     // Slightly faster
    daily: 2.5,    // Slightly slower
    monthly: 4.0,  // Much slower
  };
  return speedMap[interval];
};
```

### Adjusting Droplet Size
Change the size calculation:

```tsx
const dropletSize = 8 + (dropletIndex % 3) * 3; // Larger droplets (8-14px)
```

## Responsive Behavior

The component automatically adapts to different screen sizes:
- **Desktop**: Full size (56px icons, 140px height)
- **Tablet (≤768px)**: Medium size (48px icons, 120px height)
- **Mobile (≤480px)**: Compact size (40px icons, 100px height)

## Performance Optimization

### GPU Acceleration
- Uses `will-change: transform`
- Uses `transform: translateZ(0)`
- Uses `backface-visibility: hidden`
- Framer-motion leverages GPU for animations

### Low-Power Effects
- Minimal blur usage (0.5px only on pulses)
- Efficient particle system
- Optimized for 60fps
- No heavy shadows or filters

## Accessibility

- ✅ Respects `prefers-reduced-motion` setting
- ✅ Semantic HTML structure
- ✅ Clear visual indicators
- ✅ Direction and speed labels

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Troubleshooting

### Particles not animating
- Check that framer-motion is installed
- Verify interval prop is valid ('minute', 'hour', 'daily', or 'monthly')
- Check browser console for errors

### Wrong direction
- Verify `isSenderView` prop is correct
- Check that it matches whether user is sender or receiver

### Performance issues on mobile
- Reduce particle count (fewer droplets/lines)
- Increase animation duration
- Check for other heavy animations on page

### Colors not showing
- Verify CSS variables are loaded
- Check that design-system.css is imported
- Inspect element to see computed styles

## Comparison with Original FlowBeam

| Feature | FlowBeam | FlowBeamHybrid |
|---------|----------|----------------|
| Style | Simple beam | Quantum waterfall |
| Lines | 1 main beam | 4 fiber-optic lines |
| Particles | 3 energy particles | 8 waterfall droplets |
| Background | Transparent | Black chrome (#0A0F0D) |
| Glow | Standard | Quantum radial glow |
| Randomization | None | Random delays & easing |
| Visual Complexity | Medium | High |

## Future Enhancements

Potential improvements:
- [ ] Add sound effects for droplet impacts
- [ ] Show amount value on droplets
- [ ] Add pause/play controls
- [ ] Multiple simultaneous streams
- [ ] Particle trails
- [ ] Color themes (red for errors, blue for pending)
- [ ] Interactive hover effects
- [ ] Particle collision detection

## Support

For issues or questions, check:
- Component source: `src/components/FlowBeamHybrid.tsx`
- Dashboard integration: `src/pages/DashboardPage.tsx`
- Design system: `src/styles/design-system.css`

## Notes

- This component is **UI only** - no blockchain logic
- Stream data is passed as props (no calculations)
- All animations are CSS/framer-motion based
- No smart contract modifications required
