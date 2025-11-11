import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-6">Last updated: November 10, 2025</p>

            <p className="mb-4">
                At NeurTask, we value your privacy and are committed to protecting your personal information.
            </p>
            <p className="mb-8">
                This Privacy Policy explains what data we collect, how we use it, how we store it, and the rights you have over your data. It applies to all visitors and users of <Link href="https://neurtask.com" className="text-blue-600 hover:underline">https://neurtask.com</Link> and related services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-2">
                We collect the following categories of information when you use NeurTask:
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Google User Data:</h3>
            <p className="mb-2">
                When you sign in using Google OAuth, we collect:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Your name</li>
                <li>Email address</li>
                <li>Profile picture</li>
                <li>Google user ID</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Account and Usage Data:</h3>
            <p className="mb-4">
                Information such as login activity, preferences, and interactions with our services to help improve user experience.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Communication Data:</h3>
            <p className="mb-4">
                Messages or inquiries you send to our team via email or contact forms.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Google API Scopes</h3>
            <p className="mb-2">
                We access the following Google user data through OAuth authentication:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong className="font-semibold">Basic profile information</strong> (name, email, profile picture) - used for account creation and authentication</li>
                <li><strong className="font-semibold">Email address</strong> - used for account identification and communication</li>
            </ul>
            <p className="mb-8">
                This data is used solely for user authentication and providing core platform functionality.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">
                We use your information to:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Authenticate users securely through Google OAuth</li>
                <li>Provide and personalize your experience on the platform</li>
                <li>Analyze aggregated usage trends to improve functionality</li>
                <li>Offer customer support and communicate service updates</li>
                <li>Maintain and improve the security of our services</li>
            </ul>
            <p className="mb-8">
                We do not use your Google user data for advertising, marketing purposes, or selling to third parties.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing and Disclosure</h2>
            <p className="mb-4">
                NeurTask does not sell, rent, or share Google user data with any third parties for marketing or advertising purposes. However, data may be processed by or shared in these limited situations:
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Third-Party Service Providers:</h3>
            <p className="mb-2">
                We use the following trusted third-party services that may process your data under strict confidentiality and data processing agreements:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong className="font-semibold">Google Cloud Platform</strong> - hosting, authentication, and infrastructure</li>
                <li><strong className="font-semibold">Vercel/hosting provider</strong> - application hosting and delivery</li>
                <li><strong className="font-semibold">Email service provider</strong> - transactional emails only (account notifications, password resets)</li>
            </ul>
            <p className="mb-4">
                All service providers are contractually required to protect your data and use it only for the purposes we specify.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Legal Requirements:</h3>
            <p className="mb-4">
                If required by law, court order, or governmental authority, we may disclose your information to comply with legal obligations.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Business Continuity:</h3>
            <p className="mb-8">
                In the event of a merger, acquisition, or sale of assets, user data will remain protected under this same policy or an equivalent privacy standard.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Use of Data for AI/ML Training</h2>
            <p className="mb-4">
                NeurTask <strong className="font-semibold">does not use your Google user data</strong> to train artificial intelligence or machine learning models.
            </p>
            <p className="mb-2">
                While our platform may utilize AI features to enhance your productivity, any AI processing:
            </p>
            <ul className="list-disc list-inside ml-4 mb-8 space-y-1">
                <li>Is performed in real-time and does not store your data for training purposes</li>
                <li>Uses only anonymized, aggregated data that cannot identify individual users</li>
                <li>Never shares your Google user data with external AI/ML training systems</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention and Deletion</h2>
            <p className="mb-2">
                We retain your personal data only as long as necessary to provide our services and comply with legal obligations.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Active Accounts:</h3>
            <p className="mb-4">
                Data is retained while your account remains active and you continue using our services.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Account Deletion:</h3>
            <p className="mb-2">
                When you delete your account or request data deletion:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>All personal data is permanently deleted within <strong className="font-semibold">30 days</strong> of your request</li>
                <li>Backup systems containing your data are purged within <strong className="font-semibold">90 days</strong></li>
                <li>Authentication tokens are immediately revoked</li>
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">How to Request Deletion:</h3>
            <p className="mb-8">
                You can request deletion anytime by:
            </p>
            <ul className="list-disc list-inside ml-4 mb-8 space-y-1">
                <li>Emailing <a href="mailto:team@gaddr.com" className="text-blue-600 hover:underline">team@gaddr.com</a> with your account email</li>
                <li>Using the account deletion feature in your account settings</li>
                <li>Revoking access via <Link href="https://myaccount.google.com/permissions" className="text-blue-600 hover:underline">Google Account Permissions</Link></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
            <p className="mb-2">
                We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong className="font-semibold">HTTPS/TLS encryption</strong> for all data transmitted between your browser and our servers</li>
                <li><strong className="font-semibold">Encrypted storage</strong> of authentication tokens and sensitive data</li>
                <li><strong className="font-semibold">Access controls</strong> limiting data access to authorized personnel only</li>
                <li><strong className="font-semibold">Regular security audits</strong> and vulnerability assessments</li>
                <li><strong className="font-semibold">Secure authentication</strong> via Google OAuth 2.0</li>
            </ul>
            <p className="mb-8">
                While we strive to protect your data, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but continuously work to improve our safeguards.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights and Data Control</h2>
            <p className="mb-2">
                You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong className="font-semibold">Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="font-semibold">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="font-semibold">Deletion:</strong> Request deletion of your account and associated data (Right to be Forgotten)</li>
                <li><strong className="font-semibold">Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong className="font-semibold">Withdraw Consent:</strong> Revoke Google data access anytime via <Link href="https://myaccount.google.com/permissions" className="text-blue-600 hover:underline">Google Account Permissions</Link></li>
                <li><strong className="font-semibold">Object to Processing:</strong> Object to certain types of data processing</li>
            </ul>
            <p className="mb-8">
                To exercise any of these rights, contact us at <a href="mailto:team@gaddr.com" className="text-blue-600 hover:underline">team@gaddr.com</a>. We will respond to your request within 30 days.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children&apos;s Privacy</h2>
            <p className="mb-4">
                NeurTask is not intended for users under the age of 16. We do not knowingly collect personal information from minors. If you believe data from a minor has been collected, please contact us immediately at <a href="mailto:team@gaddr.com" className="text-blue-600 hover:underline">team@gaddr.com</a> and we will remove it promptly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
            <p className="mb-2">
                Your information may be processed and stored on servers located outside your country of residence. We ensure all international transfers comply with applicable privacy laws using:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Standard contractual clauses approved by the European Commission</li>
                <li>Adequate data protection safeguards</li>
                <li>Compliance with GDPR and equivalent privacy regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="mb-2">
                We use essential cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze site performance (using anonymized data only)</li>
            </ul>
            <p className="mb-8">
                You can control cookie settings through your browser, but disabling cookies may affect platform functionality.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="mb-2">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Significant updates will be communicated via:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Notice on our website</li>
                <li>Email to registered users</li>
                <li>In-app notifications</li>
            </ul>
            <p className="mb-8">
                The "Last Updated" date at the top reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p className="mb-2">
                For any questions, concerns, or data-related requests, please contact us:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong className="font-semibold">Email:</strong> <a href="mailto:team@gaddr.com" className="text-blue-600 hover:underline">team@gaddr.com</a></li>
                <li><strong className="font-semibold">Company:</strong> Gaddr AB</li>
                <li><strong className="font-semibold">Website:</strong> <Link href="https://neurtask.com" className="text-blue-600 hover:underline">https://neurtask.com</Link></li>
                <li><strong className="font-semibold">Response Time:</strong> We aim to respond to all inquiries within 5 business days.</li>
            </ul>

            <h3 className="text-xl font-medium mt-8 mb-2">Summary of Key Points</h3>
            <ul className="list-disc list-inside ml-4 mb-8 space-y-1">
                <li>We only collect data necessary for authentication and service provision</li>
                <li>We never sell or use your data for advertising</li>
                <li>You can delete your data anytime</li>
                <li>We use industry-standard security measures</li>
                <li>Your Google data is never used for AI training</li>
                <li>You have full control over your information</li>
            </ul>
            <p className="mb-4 text-sm text-gray-600">
                This policy complies with: GDPR (EU), Google API Services User Data Policy, Google OAuth 2.0 Policy, and Google APIs Terms of Service.
            </p>
        </main>
    );
}
