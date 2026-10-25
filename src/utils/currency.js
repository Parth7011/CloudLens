/**
 * Formats a numeric value into USD currency format ($XX,XXX.XX or $XX.XK)
 */
export function formatUSD(amount, options = {}) {
  const { compact = false, minimumFractionDigits = 2 } = options;

  if (amount == null || isNaN(amount)) return '$0.00';

  if (compact) {
    if (Math.abs(amount) >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}k`;
    }
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits
  }).format(amount);
}
