/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_MOCK_DELAY_MS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@glidejs/glide' {
  export interface GlideOptions {
    type?: 'slider' | 'carousel';
    startAt?: number;
    perView?: number;
    focusAt?: number | 'center';
    gap?: number;
    autoplay?: number | boolean;
    hoverpause?: boolean;
    keyboard?: boolean;
    bound?: boolean;
    swipeThreshold?: number | boolean;
    dragThreshold?: number | boolean;
    perTouch?: number | boolean;
    touchRatio?: number;
    touchAngle?: number;
    animationDuration?: number;
    rewind?: boolean;
    rewindDuration?: number;
    animationTimingFunc?: string;
    direction?: 'ltr' | 'rtl';
    peek?: number | { before?: number; after?: number };
    breakpoints?: Record<number, Partial<GlideOptions>>;
    classes?: Record<string, string>;
    throttle?: number;
  }

  export default class Glide {
    constructor(selector: string | HTMLElement, options?: GlideOptions);
    mount(components?: Record<string, any>): this;
    update(options?: Partial<GlideOptions>): this;
    destroy(): this;
    go(pattern: string): this;
    on(event: string | string[], handler: (...args: any[]) => void): this;
    index: number;
    settings: GlideOptions;
  }
}

