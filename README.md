# KU Wongnai - Frontend

Welcome to the frontend repository of KU Wongnai! Built with Next.js, this app elegantly showcases dynamic app routing.

## 🧰 Technologies and Libraries

- **Next.js**: Our foundational framework.
- **Shadcn**: Enhancing UI through [Shadcn](https://ui.shadcn.com/), blending Radix UI with Tailwind CSS.
- **React Hook Form**: For efficient and flexible [form validation](https://react-hook-form.com/).
- **Lucide Icons**: Elevate aesthetics with [lucide icons](https://lucide.dev/), a set of gorgeous open-source icons.
- **Zod**: A TypeScript-first schema declaration and validation library. Ensure strong typing and validation with [Zod](https://zod.dev/).
- **Zustand**: A small, fast, and scaleable bearbones state-management solution. Simplify state logic with [Zustand](https://zustand-demo.pmnd.rs/).

## 🚀 Setup & Development

### Prerequisites

Copy `.env.example` to `.env`

```sh
cp .env.example .env
```

This key have the same as Notification Service
```
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

1. **pnpm**: Our chosen package manager. Install it globally if you haven't:

   ```sh
   npm i -g pnpm
   ```

### Installation

2. **Dependencies**: Ensure all the required packages are in place:

   ```sh
   pnpm install
   ```

### Running the App

3. **Development Server**: Launch it with:

   ```bash
   pnpm dev
   ```

4. Head to [http://localhost:3000](http://localhost:3000) in your browser to view the application live.

## 🐳 Docker Integration

For those who prefer Docker for development or deployment, we've got you covered.

### Building and Running with Docker

1. Ensure Docker and `docker-compose` are installed on your system.

2. Build and start the services defined in the `docker-compose.yaml`:

   ```bash
   docker-compose up --build
   ```

3. Visit [http://localhost:3000](http://localhost:3000) to see the app in action.
   
4. Docker Image Repository: [KU Wongnai Frontend on Docker Hub](https://hub.docker.com/r/ong22280/kuwongnai-frontend)

⚙️ **Note**: For service configurations and port settings, see `docker-compose.yaml`.

📝 **Pro Tip**: Dive right into customization with `app/page.tsx`. Real-time updates keep development agile.

## 📚 Further Reading

Enhance your understanding and skills with these resources:

- **Next.js**:

  - [Official Documentation](https://nextjs.org/docs) - Comprehensive guide on Next.js features.
  - [Interactive Tutorial](https://nextjs.org/learn) - Hands-on learning with Next.js.
  - [GitHub Repository](https://github.com/vercel/next.js/) - For those looking to contribute or get under the hood.

- **Other Libraries**:
  - [React Hook Form](https://react-hook-form.com/) - Efficient and flexible form validation for React.
  - [Shadcn](https://ui.shadcn.com/) - UI library blending Radix UI with Tailwind CSS for rapid design.
  - [Lucide Icons](https://lucide.dev/) - Open-source icons to enhance app aesthetics.
  - [Zod]() - Schema declaration and validation made easy.
  - [Zustand]() - Effortless state management for React.

## 🚀 Deployment

Streamline your deployment on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the brainchild of Next.js creators.

For detailed deployment insights, delve into the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
