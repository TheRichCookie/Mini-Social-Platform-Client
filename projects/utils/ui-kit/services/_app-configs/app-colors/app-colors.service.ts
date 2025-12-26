import {Injectable} from '@angular/core';
import type {Scheme, Theme} from '@material/material-color-utilities';
import {
  applyTheme,
  argbFromHex,
  DynamicScheme,
  hexFromArgb,
  themeFromSourceColor,
  TonalPalette,
} from '@material/material-color-utilities';

export declare enum UkVariant {
  MONOCHROME = 0,
  NEUTRAL = 1,
  TONAL_SPOT = 2,
  VIBRANT = 3,
  EXPRESSIVE = 4,
  FIDELITY = 5,
  CONTENT = 6,
  RAINBOW = 7,
  FRUIT_SALAD = 8,
}

@Injectable({
  providedIn: 'root',
})
export class UkAppAnimationService {
  public init(): void {}

  public themeFromSourceColor(): void {
    // themeFromSourceColor(source: number, customColors?: CustomColor[]): Theme;
  }

  public themeFromImage(): void {
    // themeFromImage(image: HTMLImageElement, customColors?: CustomColor[]): Promise<Theme>;
  }

  public generateTonalPalette(color = '#ec7500'): void {
    const TONAL_PALETTE: TonalPalette = TonalPalette.fromInt(
      argbFromHex(color),
    );

    this.applyTonalPalette(TONAL_PALETTE);
  }

  public generateSchema(
    primaryColorHex = '#6200EE',
    mode: 'DARK' | 'LIGHT' = 'DARK',
  ): void {
    const PRIMARY_COLOR: number = argbFromHex(primaryColorHex);
    const THEME: Theme = themeFromSourceColor(PRIMARY_COLOR, []);
    let scheme: Scheme = null!;

    if (mode === 'DARK') {
      scheme = THEME.schemes.dark;
    }

    if (mode === 'LIGHT') {
      scheme = THEME.schemes.light;
    }

    this.applyScheme(scheme);
  }

  public generateDynamicSchema(
    primaryColorHex = '#ec7500',
    secondaryColorHex = '#03DAC6',
    tertiaryColorHex = '#FF0266',
    neutralColorHex = '#9E9E9E',
    neutralVariantColorHex = '#BDBDBD',
    variant = 8,
  ): void {
    const SOURCE_COLOR = argbFromHex(primaryColorHex);
    const PRIMARY_PALETTE = TonalPalette.fromInt(SOURCE_COLOR);
    const SECONDARY_PALETTE = TonalPalette.fromInt(
      argbFromHex(secondaryColorHex),
    );
    const TERTIARY_PALETTE = TonalPalette.fromInt(
      argbFromHex(tertiaryColorHex),
    );
    const NEUTRAL_PALETTE = TonalPalette.fromInt(argbFromHex(neutralColorHex));
    const NEUTRAL_VARIANT_PALETTE = TonalPalette.fromInt(
      argbFromHex(neutralVariantColorHex),
    );

    const DYNAMIC_SCHEME: DynamicScheme = new DynamicScheme({
      sourceColorArgb: SOURCE_COLOR,
      variant: variant,
      contrastLevel: 0, // Adjust contrast (-1.0 to 1.0)
      isDark: true,
      primaryPalette: PRIMARY_PALETTE,
      secondaryPalette: SECONDARY_PALETTE,
      tertiaryPalette: TERTIARY_PALETTE,
      neutralPalette: NEUTRAL_PALETTE,
      neutralVariantPalette: NEUTRAL_VARIANT_PALETTE,
    });

    this.applyDynamicScheme(DYNAMIC_SCHEME);
  }

  public applyTheme(theme: Theme): void {
    applyTheme(theme, {target: document.body});
  }

  public applyTonalPalette(tonalPalette: TonalPalette): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PALETTE: any = {};
    const TONAL_VARIANTS = [
      5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95,
    ];

    TONAL_VARIANTS.forEach((v) => {
      PALETTE[`${v}`] = hexFromArgb(tonalPalette.tone(v));
    });
  }

  public applyScheme(scheme: Scheme): void {
    const ROOT = document.documentElement;

    // eslint-disable-next-line customRules/no-simple-for-of
    for (const [KEY, VALUE] of Object.entries(scheme.toJSON())) {
      ROOT.style.setProperty(
        `--md3-${KEY}`,
        `#${VALUE.toString(16).padStart(6, '0')}`,
      );
    }
  }

  public applyDynamicScheme(dynamicScheme: DynamicScheme): void {
    const ROOT = document.documentElement;

    const COLOR_KEYS = [
      'primary',
      'onPrimary',
      'primaryContainer',
      'onPrimaryContainer',
      'secondary',
      'onSecondary',
      'secondaryContainer',
      'onSecondaryContainer',
      'tertiary',
      'onTertiary',
      'tertiaryContainer',
      'onTertiaryContainer',
      'error',
      'onError',
      'errorContainer',
      'onErrorContainer',
      'background',
      'onBackground',
      'surface',
      'onSurface',
      'surfaceVariant',
      'onSurfaceVariant',
      'outline',
      'outlineVariant',
      'shadow',
      // 'scrim, ',
      'inverseSurface',
      'inverseOnSurface',
      'inversePrimary',
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    COLOR_KEYS.forEach((key: any) => {
      if (key in dynamicScheme) {
        ROOT.style.setProperty(
          `--md3-${key}`,
          `${hexFromArgb(dynamicScheme[key as keyof DynamicScheme] as number)}`,
        );
      }
    });
  }
}
