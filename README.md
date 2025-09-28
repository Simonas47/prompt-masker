# Prompt Masker

AI prompt masker for sensitive information - A frontend Angular application to protect sensitive data before sending prompts to AI services.

![Prompt Masker Screenshot](https://github.com/user-attachments/assets/864e54a3-0704-4e95-95ae-b02ba0bf29c2)

## Features

- 🔍 **Smart Detection**: Automatically highlights potentially sensitive words and patterns
- 🎯 **Custom Masking**: Add your own masking rules for specific words or phrases  
- 👀 **Real-time Preview**: See highlighted sensitive content and masked output instantly
- 📋 **Easy Export**: Copy masked prompts to clipboard or download as text files
- 📱 **Responsive Design**: Clean, modern UI that works on desktop and mobile
- 🛡️ **Privacy First**: Everything runs in your browser - no data is sent to external servers

## Common Use Cases

- Mask service names, hostnames, and internal URLs before sending code to AI
- Hide database credentials, API keys, and configuration values
- Protect company-specific terminology and internal project names
- Sanitize documentation before sharing with AI assistants

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Simonas47/prompt-masker.git
   cd prompt-masker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

## How to Use

1. **Paste your text** containing sensitive information in the prompt area
2. **Review highlighted words** that might be sensitive (domains, IPs, emails, etc.)
3. **Add masking rules** by clicking highlighted words or manually entering them
4. **Review the masked output** to ensure all sensitive data is properly replaced
5. **Copy or download** the masked prompt to use with AI services

## Automatic Detection

The application automatically detects and highlights:
- Domain names (e.g., `api.company.com`)
- IP addresses (e.g., `192.168.1.1`)
- Email addresses (e.g., `user@company.com`)
- Environment names (e.g., `production`, `staging`)
- Service names with common patterns
- Constants in ALL_CAPS format

## Building for Production

```bash
npm run build
```

The built files will be available in the `dist/prompt-masker` directory.

## Technology Stack

- **Angular** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with custom components
- **Node.js** - Development and build tools

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.