const PrivacyPage = () => {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                This Privacy Policy explains how Neurtask we collects, uses, and protects your personal information when you use our services, including authentication and data access through Google OAuth.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
                When you sign in using Google OAuth, we may request access to:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li><strong>Email:</strong> Used to identify your account and communicate important updates.</li>
                <li><strong>Profile Information:</strong> Such as your name and profile picture, to personalize your experience.</li>
                <li><strong>Google Calendar:</strong> Used to display, create, and manage events only with your explicit consent.</li>
            </ul>
            <p className="mb-4">
                We do not collect your Google password or any sensitive Gmail message content.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use the Information</h2>
            <p className="mb-4">
                We use the data solely to provide core functionality in Neurtask, such as user authentication, account management, and integration with Google Calendar for scheduling tasks or events.
            </p>
            <p className="mb-4">
                We do not share or sell your data to any third parties, and we never use your Google information for advertising purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Access and Storage of Google Data</h2>
            <p className="mb-4">
                Your Google data is accessed securely via OAuth tokens. If stored, data is encrypted and only retained as long as required to provide the service. You can revoke Neurtask’s access to your Google data at any time from your <a href="https://myaccount.google.com/permissions" target="_blank" className="text-blue-600">Google Account permissions</a> page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Google API Services Compliance</h2>
            <p className="mb-4">
                Neurtask’s use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" className="text-blue-600">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention and Deletion</h2>
            <p className="mb-4">
                You may request deletion of your data by contacting us at <a href="mailto:support@neurtask.com" className="text-blue-600">support@neurtask.com</a>. Once deleted, all stored OAuth tokens and related data will be permanently removed from our systems.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Security</h2>
            <p className="mb-4">
                We use industry-standard encryption and security practices to protect your data from unauthorized access or disclosure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Changes will be reflected on this page with a new “Last Updated” date.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: November 2025</p>
        </main>
    )
}

export default PrivacyPage
