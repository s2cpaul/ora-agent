# Firebase Email Function Setup

## Overview
To actually send User Agreement emails, you'll need to set up a Firebase Cloud Function with an email service.

## Option 1: Using SendGrid (Recommended)

### 1. Install Firebase Functions
```bash
npm install -g firebase-tools
firebase init functions
```

### 2. Install SendGrid
```bash
cd functions
npm install @sendgrid/mail
```

### 3. Create the Email Function
Create `functions/src/sendUserAgreement.ts`:

```typescript
import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

// Set SendGrid API key from environment
sgMail.setApiKey(functions.config().sendgrid.key);

export const sendUserAgreement = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }

  const msg = {
    to: email,
    from: 'noreply@myora.now', // Must be verified with SendGrid
    subject: 'ORA - Free Trial User Agreement',
    text: `
Dear User,

Thank you for downloading the Free Trial Version of ORA - AI Leadership Agent!

USER AGREEMENT

How Your Questions Help:
✓ Train specialized AI models focused on leadership & governance challenges
✓ Improve answer quality for all users based on real-world questions
✓ Identify common challenges leaders face in AI implementation
✓ Build better features based on what users actually need

Your Privacy is Protected:
• All data is anonymized - No names, emails, or company identifiers
• You can opt-out anytime in your settings
• Paid subscribers' data is NEVER used for training
• Only questions, not personal information are collected
• Full GDPR & privacy compliance

Free Trial Support:
No direct support available for free trial users. However, all free trial users can sign up for one complimentary Live Q&A session using our Calendly link to get personalized guidance.

Schedule your session: https://calendly.com/caraz007

By accepting this agreement, you agree to our Privacy Policy and Terms of Service.

Welcome to ORA!

---
ORA - Observe, Respond, Act
https://agent.myora.now
    `,
    html: `
      <h2>Welcome to ORA - AI Leadership Agent!</h2>
      <p>Thank you for downloading the Free Trial Version.</p>
      
      <h3>USER AGREEMENT</h3>
      
      <h4>How Your Questions Help:</h4>
      <ul>
        <li>✓ Train specialized AI models focused on leadership & governance challenges</li>
        <li>✓ Improve answer quality for all users based on real-world questions</li>
        <li>✓ Identify common challenges leaders face in AI implementation</li>
        <li>✓ Build better features based on what users actually need</li>
      </ul>
      
      <h4>Your Privacy is Protected:</h4>
      <ul>
        <li>• All data is anonymized - No names, emails, or company identifiers</li>
        <li>• You can opt-out anytime in your settings</li>
        <li>• Paid subscribers' data is NEVER used for training</li>
        <li>• Only questions, not personal information are collected</li>
        <li>• Full GDPR & privacy compliance</li>
      </ul>
      
      <h4>Free Trial Support:</h4>
      <p>No direct support available for free trial users. However, all free trial users can sign up for one complimentary Live Q&A session.</p>
      <p><a href="https://calendly.com/caraz007" style="background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Schedule Your Free Q&A Session →</a></p>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
      <p style="color: #666; font-size: 12px;">
        ORA - Observe, Respond, Act<br>
        <a href="https://agent.myora.now">https://agent.myora.now</a>
      </p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});
```

### 4. Set SendGrid API Key
```bash
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
```

### 5. Deploy the Function
```bash
firebase deploy --only functions
```

### 6. Update Frontend Code
Replace the TODO section in `DataConsentModal.tsx`:

```typescript
const response = await fetch('https://YOUR_PROJECT_ID.cloudfunctions.net/sendUserAgreement', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: { email: userEmail }
  }),
});
```

## Option 2: Using Resend (Modern Alternative)

Resend is easier to set up and more developer-friendly:

```bash
npm install resend
```

```typescript
import { Resend } from 'resend';

const resend = new Resend(functions.config().resend.key);

export const sendUserAgreement = functions.https.onCall(async (data) => {
  const { email } = data;

  await resend.emails.send({
    from: 'ORA <noreply@myora.now>',
    to: email,
    subject: 'ORA - Free Trial User Agreement',
    html: '...' // Same HTML as above
  });

  return { success: true };
});
```

## Option 3: Using Supabase Edge Functions

If you prefer Supabase:

1. Create edge function: `supabase functions new send-user-agreement`
2. Use Resend or SendGrid in the function
3. Deploy: `supabase functions deploy send-user-agreement`

## SendGrid Setup Steps

1. Sign up at https://sendgrid.com
2. Create API key in Settings → API Keys
3. Verify sender email (noreply@myora.now)
4. Add domain verification for myora.now
5. Get API key and add to Firebase config

## Cost Estimates

- **SendGrid**: Free tier = 100 emails/day
- **Resend**: Free tier = 100 emails/day, 3,000/month
- **Firebase Functions**: Free tier = 125K invocations/month

## Testing

Test the function locally:
```bash
firebase emulators:start
```

Then update your frontend to point to local emulator during development.
