import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

export interface UkSeoConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

@Injectable({providedIn: 'root'})
export class UkSeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  public readonly defaultConfig: UkSeoConfig = {
    title: 'hangout',
    description: '',
    image: '',
    url: '',
  };

  public update(config: UkSeoConfig = {}): void {
    const seo = {
      ...JSON.parse(JSON.stringify(this.defaultConfig)),
      ...config,
    };

    // --- Title ---
    if (seo.title) {
      this.title.setTitle(seo.title);
      this.updateTag('og:title', seo.title, 'property');
      this.updateTag('twitter:title', seo.title);
    }

    // --- Description ---
    if (seo.description) {
      this.updateTag('description', seo.description);
      this.updateTag('og:description', seo.description, 'property');
      this.updateTag('twitter:description', seo.description);
    }

    // --- Image ---
    if (seo.image) {
      this.updateTag('og:image', seo.image, 'property');
      this.updateTag('twitter:image', seo.image);
    }

    // --- URL ---
    if (seo.url) {
      this.updateTag('og:url', seo.url, 'property');
      this.updateCanonical(seo.url);
    }

    // --- Robots ---
    if (seo.noIndex) {
      this.updateTag('robots', 'noindex, nofollow');
    } else {
      this.updateTag('robots', 'index, follow');
    }
  }

  private updateTag(
    name: string,
    content: string,
    attr: 'name' | 'property' = 'name',
  ): void {
    if (!content) return;
    this.meta.updateTag({[attr]: name, content});
  }

  private updateCanonical(url: string): void {
    const link: HTMLLinkElement =
      this.document.querySelector("link[rel='canonical']") ??
      this.document.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);

    if (!link.parentNode) {
      this.document.head.appendChild(link);
    }
  }
}
