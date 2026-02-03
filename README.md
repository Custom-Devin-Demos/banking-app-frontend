# React Banking App Template

Are you ready to revolutionize the world of online banking? This template is designed to help you create a modern, user-friendly, and visually stunning banking application using React. With its sleek design and cutting-edge technology, this template is the perfect starting point for your next project.

**Key Features**

- **Responsive Design**: A mobile-first approach ensures a seamless user experience across all devices.
- **Modern UI**: A clean, intuitive interface that makes banking easy and enjoyable.
- **Customizable**: Tailor the template to fit your brand's unique style and needs.
- **Easy Integration**: Integrate with your existing banking systems or third-party services with ease.

**Get Started**

Whether you're a seasoned developer or just starting out, this template provides a solid foundation for your project. Follow the simple installation steps to get up and running quickly.

## Support this project

You are free to download, change and use it anywhere. I will regularly update this template with new resources and pages I found on the web. Don't hesitate to participate by sending a PR! Maybe your first on Github :)

If you like this resource, please follow me on GitHub. Thank you!

## Demo

[https://react-banking-app-template.vercel.app](https://react-banking-app-template.vercel.app)

## Screenshots

![Signin](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/signin.png)

![Home](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/home.png)

![Transactions](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/transactions.png)

![Cards](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/cards.png)

![Add](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/addmoney.png)

![Profile](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/profile.png)

![Savings](https://raw.githubusercontent.com/cenksari/react-banking-app-template/master/screenshots/savings.png)

## Installation

1. Clone the project:

   ```bash
   git clone https://github.com/cenksari/react-banking-app-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-banking-app-template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Start the application:

   ```bash
   npm start
   ```

## Usage

Once the application is started, navigate to [http://localhost:3000](http://localhost:3000) in your browser to test application.

## Error Tracking with Sentry

This application includes [Sentry](https://sentry.io) for error monitoring, performance tracing, and session replay.

**Features:**

- Automatic error capture and reporting
- Browser performance tracing
- Session replay for debugging user issues
- ErrorBoundary component wrapping the app to catch React errors

**Configuration:**

The Sentry DSN is configured in `src/sentry.ts`. If you fork this repository, replace the DSN with your own from your Sentry project settings.

**Sample Rates (configurable in `src/sentry.ts`):**

- `tracesSampleRate: 1.0` - Captures 100% of transactions for performance monitoring (reduce in production to manage costs)
- `replaysSessionSampleRate: 0.1` - Captures 10% of all sessions for replay
- `replaysOnErrorSampleRate: 1.0` - Captures 100% of sessions with errors for replay

**Note:** The test error button on the Home page is for verifying Sentry integration and should be removed before production deployment.

**Note:** The Transactions page includes a slow page load test that simulates a 4-second API delay and logs an error to Sentry when the load time exceeds 3 seconds. This demo code should be removed before production deployment.

## Audit Logging

This application includes audit logging to track security-relevant and business-critical actions. Audit events are output to the browser console and integrated with Sentry as breadcrumbs for debugging.

**Tracked Events:**

- User authentication (login success/failure, logout)
- Account balance views (home page)
- Transaction views and operations (transactions page, add money)
- Profile views and settings interactions
- Card management page views
- Savings page views and currency selection

**Audit Event Schema:**

Each audit event follows this structure:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "actor": "user-identifier",
  "action": "USER_LOGIN",
  "resource": "auth:signin",
  "outcome": "success",
  "metadata": {}
}
```

**Viewing Audit Logs:**

Open your browser's Developer Tools (F12) and navigate to the Console tab. Audit events appear with the `[AUDIT]` prefix as JSON objects.

**Configuration:**

The audit logger is located in `src/services/auditLogger.ts`. Available actions are defined in the `AuditActions` constant.

**Note:** The `getCurrentActor()` function returns a placeholder value (`'current-user'`). For production use, this should be connected to your actual user authentication/session state to return the real user identifier.

## Contributing

If you would like to contribute, please create a new branch and submit a pull request with your changes. Review may be needed before acceptance.

## Authors

@cenksari

## License

MIT
