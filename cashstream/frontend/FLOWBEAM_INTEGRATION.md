# FlowBeam Component - Integration Guide

## Overview
The FlowBeam component creates an animated neon energy flow visualization between sender and receiver addresses, perfect for displaying active payment streams on the Dashboard.

## Features
- ✅ Neon green energy flow (#35FF79) with blue edge highlights (#00F6FF)
- ✅ Animated particles and pulsing orbs
- ✅ Speed varies based on stream interval
- ✅ Automatically reverses direction if user is the receiver
- ✅ Fully responsive (mobile-first design)
- ✅ Reduced motion support
- ✅ Built with framer-motion + TailwindCSS

## Installation
The component is already integrated into the Dashboard. No additional installation needed.

## Usage

### Basic Example
```tsx
import { FlowBeam } from '../components';

<FlowBeam
  senderAddress="AU12CzXE7mHZSvRx..."
  receiverAddress="AU34AbCdEf5gHiJk..."
  userAddress={wallet.address}
  interval={3600}
  amount="100"
/>
```

### With Real Stream Data
```tsx
// Fetch stream data from blockchain
const stream = await fetchActiveStream();

<FlowBeam
  senderAddress={stream.sender}
  receiverAddress={stream.receiver}
  userAddress={wallet.address}
  interval={stream.interval}
  amount={stream.amount}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `senderAddress` | `string` | Yes | Wallet address of the sender |
| `receiverAddress` | `string` | Yes | Wallet address of the receiver |
| `userAddress` | `string` | Yes | Current user's wallet address |
| `interval` | `string \| number` | Yes | Stream interval in seconds/cycles |
| `amount` | `string \| number` | Yes | Amount being streamed |

## Animation Speed Mappings

The beam animation speed is automatically determined by the interval:

| Interval | Speed | Duration |
|----------|-------|----------|
| ≤ 60s (minute) | Super Fast | 0.8s |
| ≤ 3600s (hour) | Fast | 1.5s |
| ≤ 86400s (daily) | Medium | 2.5s |
| > 86400s (monthly) | Slow | 4.0s |

## Direction Logic

The beam automatically reverses direction based on the user's role:
- **User is Sender**: Beam flows left → right (Sending →)
- **User is Receiver**: Beam flows right → left (← Receiving)

## Dashboard Integration

The FlowBeam is integrated into the Dashboard in the "Active Stream Flow" card:

```tsx
{/* Active Stream Flow Card with FlowBeam */}
<div className="card card-glow animate-fade-in-up">
  <div className="card-header">
    <h2 className="card-title">Active Stream Flow</h2>
    <span className="badge badge-success">Live</span>
  </div>
  
  <div className="card-body" style={{ padding: 0 }}>
    <FlowBeam
      senderAddress={activeStream.sender}
      receiverAddress={activeStream.receiver}
      userAddress={wallet.address}
      interval={activeStream.interval}
      amount={activeStream.amount}
    />
    
    {/* Stream details below */}
  </div>
</div>
```

## Customization

### Adjusting Colors
Edit the component to change colors:
```tsx
// Green energy: #35FF79
// Blue highlights: #00F6FF
```

### Adjusting Speed
Modify the `getAnimationSpeed` function in `FlowBeam.tsx`:
```tsx
const getAnimationSpeed = (interval: string | number): number => {
  // Your custom logic here
};
```

### Adjusting Particle Count
Change the array length in the map functions:
```tsx
{[0, 1, 2].map((index) => ( // Change to [0, 1, 2, 3, 4] for more particles
  <motion.div ... />
))}
```

## Responsive Behavior

The component automatically adapts to different screen sizes:
- **Desktop**: Full size (48px icons, 120px height)
- **Tablet (≤640px)**: Medium size (40px icons, 100px height)
- **Mobile (≤480px)**: Compact size (36px icons, 80px height)

## Accessibility

- ✅ Respects `prefers-reduced-motion` setting
- ✅ Semantic HTML structure
- ✅ Clear visual indicators
- ✅ Direction label for screen readers

## Performance

- Uses GPU-accelerated animations via framer-motion
- Optimized for 60fps
- Minimal re-renders
- Efficient particle system

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Troubleshooting

### Beam not animating
- Check that framer-motion is installed: `npm list framer-motion`
- Verify interval prop is a valid number
- Check browser console for errors

### Wrong direction
- Verify `userAddress` matches either `senderAddress` or `receiverAddress`
- Check address comparison logic (case-sensitive)

### Performance issues
- Reduce particle count
- Increase animation duration
- Check for other heavy animations on the page

## Future Enhancements

Potential improvements:
- [ ] Add sound effects on particle movement
- [ ] Show amount value on particles
- [ ] Add pause/play controls
- [ ] Multiple simultaneous streams
- [ ] Historical flow visualization
- [ ] Custom particle shapes

## Support

For issues or questions, check:
- Component source: `src/components/FlowBeam.tsx`
- Dashboard integration: `src/pages/DashboardPage.tsx`
- Design system: `src/styles/design-system.css`
