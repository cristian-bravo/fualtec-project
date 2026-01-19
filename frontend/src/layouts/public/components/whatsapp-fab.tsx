import { Tooltip } from '../../../components/ui/tooltip';

export const WhatsAppFab = () => (
  <div className="fixed right-5 bottom-5 z-[60]">
    <Tooltip content="WhatsApp">
      <a
        href="https://wa.me/593994342217"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="inline-flex h-16 w-16 items-center justify-center transition-transform hover:scale-[1.05] focus:outline-none"
      >
        <svg
          viewBox="0 0 64 64"
          width="100%"
          height="100%"
          aria-hidden="true"
          style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.25))' }}
        >
          <circle
            cx="32"
            cy="30"
            r="24"
            fill="#25D366"
            stroke="#FFFFFF"
            strokeWidth="6"
          />
          <path d="M22 49 L19 60 L29 54 Z" fill="#FFFFFF" />
          <svg
            x="17"
            y="16"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            style={{ transform: 'translate(-15px, -15px)' }}
          >
            <path
              fill="#FFFFFF"
              d="M16.57 13.5c-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.11-.15.22-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.11-.96-.35-1.83-1.11-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.22.23-.37.08-.15.04-.28-.02-.39-.06-.11-.51-1.24-.7-1.7-.18-.43-.37-.37-.51-.38h-.43c-.15 0-.39.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.11.15 1.6 2.45 3.87 3.43.54.23.96.37 1.29.47.54.17 1.03.15 1.42.09.43-.06 1.36-.55 1.55-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.16-.43-.27z"
            />
          </svg>
        </svg>
      </a>
    </Tooltip>
  </div>
);
