(function (root, factory) {
  const rules = factory();
  if (typeof module === 'object' && module.exports) module.exports = rules;
  else root.CommerceRules = rules;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function amount(value) {
    if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('Expected non-negative integer fils');
    return value;
  }
  function deliveryFee(subtotal) {
    amount(subtotal);
    return subtotal >= 9900 ? 0 : subtotal >= 4900 ? 399 : 599;
  }
  function deliveryProgress(subtotal) {
    amount(subtotal);
    return { remaining: Math.max(0, 9900 - subtotal), ratio: Math.min(1, subtotal / 9900) };
  }
  function productQuantity(items, productId) {
    return items.filter(item => String(item.product_id) === String(productId)).reduce((sum, item) => sum + item.quantity, 0);
  }
  function canAdd(items, productId, quantity, max) {
    return Number.isSafeInteger(quantity) && quantity > 0 && (!max || productQuantity(items, productId) + quantity <= max);
  }
  function activeZone(zones, id) {
    return Array.isArray(zones) && zones.some(zone => zone && zone.id === id && zone.active === true && zone.city === 'Dubai');
  }
  function eligibleSlots(slots, now = Date.now()) {
    if (!Array.isArray(slots)) return [];
    const dubaiDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(now));
    return slots.filter(slot => slot && typeof slot.id === 'string' && typeof slot.label === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(slot.date) && slot.date > dubaiDay && Number.isFinite(Date.parse(slot.startsAt)) && Date.parse(slot.startsAt) > now && new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(slot.startsAt)) === slot.date && Number.isSafeInteger(slot.remaining) && slot.remaining >= 0);
  }
  function checkoutProblem(config, cart, zones) {
    if (!config.checkoutReady) return 'setup';
    if (!cart.items?.length) return 'empty';
    if (cart.currency !== 'AED') return 'currency';
    if (!activeZone(zones, cart.attributes?.delivery_zone)) return 'zone';
    return null;
  }
  return { deliveryFee, deliveryProgress, productQuantity, canAdd, activeZone, eligibleSlots, checkoutProblem };
});
