export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.RESEND_TO_EMAIL || 'travishshaikh30@gmail.com'

  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'Email service is not configured. Please email directly.' })
  }

  const body = req.body || {}
  if (body._honey) {
    return res.status(200).json({ success: true })
  }

  const name = String(body.name || '').trim().slice(0, 120)
  const email = String(body.email || '').trim().slice(0, 254)
  const company = String(body.company || '').trim().slice(0, 160)
  const type = String(body.type || 'Other').trim().slice(0, 100)
  const budget = String(body.budget || 'Not sure yet').trim().slice(0, 80)
  const message = String(body.message || '').trim().slice(0, 5000)

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please complete your name, email, and project details.' })
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' })
  }

  const escapeHtml = value => value.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCompany = escapeHtml(company || 'Not provided')
  const safeType = escapeHtml(type)
  const safeBudget = escapeHtml(budget)
  const safeMessage = escapeHtml(message).replace(/\\r?\\n/g, '<br>')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [recipient],
        reply_to: email,
        subject: `Portfolio inquiry — ${type}`,
        text: [
          'New portfolio inquiry',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || 'Not provided'}`,
          `Project type: ${type}`,
          `Budget: ${budget}`,
          '',
          'Project details:',
          message,
        ].join('\\n'),
        html: `<h2>New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Project type:</strong> ${safeType}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
          <p><strong>Project details:</strong><br>${safeMessage}</p>`,
      }),
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      console.error('Resend API error:', response.status, result)
      return res.status(response.status === 429 ? 429 : 502).json({
        success: false,
        error: result.message || result.name || 'Resend could not send the email. Check your Resend domain and recipient settings.',
      })
    }

    return res.status(200).json({ success: true, id: result.id })
  } catch (error) {
    console.error('Contact email request failed:', error)
    return res.status(502).json({ success: false, error: 'Could not reach the email service. Please try again later.' })
  }
}
