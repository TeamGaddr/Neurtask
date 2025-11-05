const TermsPage = () => {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">
                Welcome to Neurtask. By using our application and connecting your Google account, you agree to these Terms of Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
            <p className="mb-4">
                Neurtask allows users to authenticate with Google and integrate with Google Calendar to create and manage events. You agree to use these features responsibly and only for lawful purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Google Account and Permissions</h2>
            <p className="mb-4">
                By signing in with Google, you grant Neurtask limited access to your Google Account information (email, profile, and calendar). This access is used solely to provide the features you explicitly authorize.
            </p>
            <p className="mb-4">
                You can revoke this access at any time from your <a href="https://myaccount.google.com/permissions" target="_blank" className="text-blue-600">Google Account settings</a>.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
            <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account and for all activities performed under your credentials. Neurtask is not responsible for unauthorized access due to user negligence.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Usage and Privacy</h2>
            <p className="mb-4">
                We only access and use Google data as described in our <a href="/privacy" className="text-blue-600">Privacy Policy</a>. We never sell or share your data with third parties.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
                Neurtask is provided “as is” and we make no guarantees regarding uptime, accuracy, or reliability. We are not liable for any damages resulting from use of our service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p className="mb-4">
                We reserve the right to suspend or terminate your account if you violate these Terms or misuse our integration with Google APIs.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p className="mb-4">
                For questions or issues regarding these Terms, please contact us at <a href="mailto:support@neurtask.com" className="text-blue-600">support@neurtask.com</a>.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: November 2025</p>
        </main>
    );
}

export default TermsPage;