exports.signUpTemplate = (name, otp, otpExipry) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify your account</title>
  <style>
    /* Reset and base styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333333;
      line-height: 1.6;
    }

    /* Layout containers */
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f6f8;
      padding: 24px 0;
    }
    .main-card {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 560px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    /* Sections */
    .header {
      padding: 28px 32px 16px;
      border-bottom: 1px solid #f1f5f9;
    }
    .brand-name {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      text-decoration: none;
    }
    .content {
      padding: 28px 32px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 22px;
      font-weight: 600;
      color: #0f172a;
    }
    p {
      margin: 0 0 16px;
      font-size: 15px;
      color: #475569;
    }

    /* OTP Box */
    .otp-container {
      margin: 24px 0;
      padding: 18px;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      text-align: center;
    }
    .otp-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 6px;
      color: #0f172a;
      margin: 0;
    }
    .expiry-note {
      font-size: 13px;
      color: #64748b;
      margin-top: 8px;
    }

    /* Footer */
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #f1f5f9;
      font-size: 12px;
      color: #64748b;
    }

    /* Mobile responsiveness */
    @media screen and (max-width: 600px) {
      .wrapper { padding: 12px; }
      .header, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
      .otp-code { font-size: 26px !important; letter-spacing: 4px !important; }
    }
  </style>
</head>
<body>
  <!-- Hidden preheader text for inbox preview -->
  <div style="display:none; max-height:0px; overflow:hidden;">
    Your verification code is ${otp}. It expires in ${otpExipry}.
  </div>

  <table class="wrapper" role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table class="main-card" role="presentation" cellpadding="0" cellspacing="0" border="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <span class="brand-name">FaceBook Clone</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content">
              <h1>Verify your email address</h1>
              <p>Hi ${name},</p>
              <p>Thanks for signing up for FaceBook Clone. Use the verification code below to complete your registration:</p>

              <div class="otp-container">
                <div class="otp-code">${otp}</div>
                <div class="expiry-note">This code expires in <strong>${otpExipry}</strong>.</div>
              </div>

              <p>If you did not request this code, you can safely ignore this email. No account will be created without verification.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin: 0 0 6px;">Sent by FaceBook Clone &bull; lagos, Nigeria</p>
              <p style="margin: 0;">Need help? Reply to this email or contact facebookClone@gmail.com.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}



exports.resendOtpTemplate = (name, otp, otpExipry) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify your account</title>
  <style>
    /* Reset and base styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333333;
      line-height: 1.6;
    }

    /* Layout containers */
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f6f8;
      padding: 24px 0;
    }
    .main-card {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 560px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    /* Sections */
    .header {
      padding: 28px 32px 16px;
      border-bottom: 1px solid #f1f5f9;
    }
    .brand-name {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      text-decoration: none;
    }
    .content {
      padding: 28px 32px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 22px;
      font-weight: 600;
      color: #0f172a;
    }
    p {
      margin: 0 0 16px;
      font-size: 15px;
      color: #475569;
    }

    /* OTP Box */
    .otp-container {
      margin: 24px 0;
      padding: 18px;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      text-align: center;
    }
    .otp-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 6px;
      color: #0f172a;
      margin: 0;
    }
    .expiry-note {
      font-size: 13px;
      color: #64748b;
      margin-top: 8px;
    }

    /* Footer */
    .footer {
      padding: 20px 32px;
      background-color: #f8fafc;
      border-top: 1px solid #f1f5f9;
      font-size: 12px;
      color: #64748b;
    }

    /* Mobile responsiveness */
    @media screen and (max-width: 600px) {
      .wrapper { padding: 12px; }
      .header, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
      .otp-code { font-size: 26px !important; letter-spacing: 4px !important; }
    }
  </style>
</head>
<body>
  <!-- Hidden preheader text for inbox preview -->
  <div style="display:none; max-height:0px; overflow:hidden;">
    Your verification code is ${otp}. It expires in ${otpExipry}.
  </div>

  <table class="wrapper" role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table class="main-card" role="presentation" cellpadding="0" cellspacing="0" border="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <span class="brand-name">FaceBook Clone</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content">
              <h1>Verify your email address</h1>
              <p>Hi ${name},</p>
              <p>You requested for a new OTP. Use the verification code below to complete your registration:</p>

              <div class="otp-container">
                <div class="otp-code">${otp}</div>
                <div class="expiry-note">This code expires in <strong>${otpExipry}</strong>.</div>
              </div>

              <p>If you did not request this code, you can safely ignore this email. No account will be created without verification.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin: 0 0 6px;">Sent by FaceBook Clone &bull; lagos, Nigeria</p>
              <p style="margin: 0;">Need help? Reply to this email or contact facebookClone@gmail.com.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}