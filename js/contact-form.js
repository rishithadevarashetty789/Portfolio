const CONTACT_ENDPOINT = "https://mnhhtvfgftlxcechlqzc.supabase.co/functions/v1/contact";

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = this.querySelector('.btn-send');
  const originalText = btn.textContent;

  // Loading state
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.6';

  const payload = {
    name:    document.getElementById('fName').value.trim(),
    email:   document.getElementById('fEmail').value.trim(),
    phone:   document.getElementById('fPhone').value.trim(),
    message: document.getElementById('fMessage').value.trim(),
  };

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Success state
      btn.textContent = 'Sent ✓';
      btn.style.opacity = '1';
      btn.style.borderColor = '#C4A882';
      btn.style.color = '#C4A882';
      this.reset();

      // Show a subtle success message
      showFormStatus('Message sent! I\'ll get back to you soon.', 'success');

      // Reset button after 4 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 4000);
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch (err) {
    console.error('Form error:', err);
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
    showFormStatus('Something went wrong. Please email directly.', 'error');
  }
});

function showFormStatus(msg, type) {
  // Remove existing status if any
  const existing = document.getElementById('formStatus');
  if (existing) existing.remove();

  const el = document.createElement('p');
  el.id = 'formStatus';
  el.textContent = msg;
  el.style.cssText = `
    margin-top: 16px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
    color: ${type === 'success' ? '#C4A882' : '#C48282'};
  `;

  document.getElementById('contactForm').appendChild(el);

  // Auto-remove after 6 seconds
  setTimeout(() => el.remove(), 6000);
}
