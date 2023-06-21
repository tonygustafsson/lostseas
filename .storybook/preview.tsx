import type { Decorator, Preview } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Modal from "../components/ui/Modal"
import { ModalProvider } from "../components/ui/Modal/context"
import Toast from "../components/ui/Toast"
import { ToastProvider } from "../components/ui/Toast/context"
import "../styles/globals.css"
import { actor, almendra } from "../fonts"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60000,
    },
  },
})

const decorators: Decorator[] = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <div className={`${almendra.variable} ${actor.variable}`}>
        <ToastProvider>
          <ModalProvider>
            <Story />

            <Toast />
            <Modal />
          </ModalProvider>
        </ToastProvider>
      </div>
    </QueryClientProvider>
  ),
]

const preview: Preview = {
  decorators,
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
