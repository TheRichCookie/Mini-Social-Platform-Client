import {
  UkCircleIconBgColor,
  UkCircleIconSize,
  UkContactGroupContactSize,
  UkDateSelectEmptyStatus,
  UkDateSelectInputMode,
  UkFileUploaderType,
  UkGroupBorderMode,
  UkImageBoxPicture,
  UkImageBoxSize,
  UkLinkTarget,
  UkModalFrameBorderRadius,
  UkModalFramePadding,
  UkPagePartBackgroundColor,
  UkPagePartBottomMargin,
  UkPagePartSidePaddings,
  UkRichTextFgColor,
  UkRichTextSize,
  UkRichTextTypography,
  UkSearchBarBorderColor,
  UkSearchBarColor,
  UkSearchBarStatus,
  UkShapeIconBgColor,
  UkShapeIconSize,
  UkShapeIconType,
  UkTableCardBgColor,
  UkTableCardSize,
  UkTableLayoutTypes,
} from '@utils/ui-kit/definitions';
import { UkEmptyStateStyle } from '@utils/ui-kit/definitions/components/empty-state/empty-state.type';

import {
  UkBannerContentStartStatus,
  UkBannerTopStatus,
  UkButtonGroupAlignType,
  UkButtonGroupType,
  UkChoiceItemsStatus,
  UkDatePickerType,
  UkDescriptiveListBgColor,
  UkDropdownInfoBgColor,
  UkDropdownInfoState,
  UkImageObjectFit,
  UkListItemStatus,
  UkMultiTabHeaderDisplay,
  UkRowLinkStatus,
  UkSearchFilterType,
  UkTileIconSize,
  UkTileWidth,
  UkTimeFormat,
} from '../../definitions';
import {
  UkBadgeBorderRadius,
  UkBadgeSize,
  UkBadgeType,
} from './badge/badge.type';
import {
  UkButtonBgColor,
  UkButtonBorderColor,
  UkButtonBorderRadius,
  UkButtonDisplay,
  UkButtonHeight,
  UkButtonPadding,
  UkButtonStyle,
  UkButtonType,
  UkButtonUkType,
} from './button/button.type';
import {
  UkBasicCardBgColor,
  UkBasicCardBorderColor,
  UkBasicCardPadding,
  UkBasicCardRadius,
} from './card/basic-card.type';
import { UkDataBgColor, UkDataBorderColor } from './data/data.type';
import { UkDesktopMultiTabHeaderDisplay } from './desktop-multi-tab/desktop-multi-tab.type';
import {
  UkDividerBgColor,
  UkDividerDisplay,
  UkDividerMargin,
  UkDividerSize,
} from './divider/divider.type';
import { UkFormBgColor } from './form/form.type';
import { UkHintType } from './hint/hint.type';
import {
  UkIconBorderColor,
  UkIconFgColor,
  UkIconName,
  UkIconSize,
} from './icon/icon.type';
import {
  UkInputBorderColor,
  UkInputMode,
  UkInputNumeric,
  UkInputType,
} from './input/input.type';
import { UkKeyValHorizontalAlignment } from './key-val/key-val.type';
import { UkLoadingColor } from './loading/loading.type';
import { UkPageBackgroundColor, UkPageBodyOverFlow } from './page/page.type';
import {
  UkSelectBgColor,
  UkSelectBorderColor,
  UkSelectBorderRadius,
  UkSelectFgColor,
  UkSelectMarginRight,
} from './select/select.type';
import {
  UkTextBgColor,
  UkTextBorderRadius,
  UkTextDirection,
  UkTextDisplay,
  UkTextFgColor,
  UkTextHorizontalAlignment,
  UkTextNumeric,
  UkTextPadding,
  UkTextTextWrap,
  UkTextType,
  UkTextTypography,
  UkTextVerticalAlignment,
  UkTextWhiteSpace,
} from './text/text.type';
import {
  UkAutoBooleanType,
  UkBooleanType,
  UkCrudMode,
  UkCursor,
  UkDeviceMode,
  UkSortType,
} from './uk/uk.type';

export const UK_TYPE = {
  BADGE: {
    TYPE: UkBadgeType,
    SIZE: UkBadgeSize,
    IS_OUTLINE: UkBooleanType,
    START_ICON_NAME: UkIconName,
    END_ICON_NAME: UkIconName,
    CURSOR: UkCursor,
    BORDER_RADIUS: UkBadgeBorderRadius,
  },
  BANNER: {
    TOP_STATUS: UkBannerTopStatus,
    CONTENT_START_STATUS: UkBannerContentStartStatus,
    DEFAULT_END_CONTENT: UkBooleanType,
  },
  BUTTON: {
    BG_COLOR: UkButtonBgColor,
    DISPLAY: UkButtonDisplay,
    TYPE: UkButtonType,
    STYLE: UkButtonStyle,
    BORDER_COLOR: UkButtonBorderColor,
    PADDING: UkButtonPadding,
    CURSOR: UkCursor,
    UK_TYPE: UkButtonUkType,
    HEIGHT: UkButtonHeight,
    FG_COLOR: UkTextFgColor,
    TYPOGRAPHY: UkTextTypography,
    HORIZONTAL_ALIGNMENT: UkTextHorizontalAlignment,
    BORDER_RADIUS: UkButtonBorderRadius,
  },
  BUTTON_GROUP: {
    TYPE: UkButtonGroupType,
    ALIGN_TYPE: UkButtonGroupAlignType,
  },
  BASIC_CARD: {
    BG_COLOR: UkBasicCardBgColor,
    BORDER_COLOR: UkBasicCardBorderColor,
    PADDING: UkBasicCardPadding,
    RADIUS: UkBasicCardRadius,
  },
  BREADCRUMB: {
    CURSOR: UkCursor,
  },
  CIRCLE_ICON: {
    BG_COLOR: UkCircleIconBgColor,
    SIZE: UkCircleIconSize,
  },
  CONTACT_GROUP_AVATAR: {
    CONTACT_SIZE: UkContactGroupContactSize,
  },
  CONTACT_ITEM: {
    IS_SELECTED: UkBooleanType,
    SHOW_END_ERROR: UkBooleanType,
    RIGHT_BORDER: UkBooleanType,
  },
  CHOICE_ITEMS: {
    STATUS: UkChoiceItemsStatus,
  },
  DATA: {
    BACKGROUND_COLOR: UkDataBgColor,
    BORDER_COLOR: UkDataBorderColor,
  },
  DATE_PICKER: {
    TYPE: UkDatePickerType,
  },
  DATE_SELECT: {
    CRUD_MODE: UkCrudMode,
    INPUT_MODE: UkDateSelectInputMode,
    EMPTY_VALUE_STATUS: UkDateSelectEmptyStatus,
    POPUP_EMPTY_VALUE_STATUS: UkDateSelectEmptyStatus,
  },
  DESCRIPTIVE_LIST: {
    BG_COLOR: UkDescriptiveListBgColor,
    CURSOR: UkCursor,
  },
  DIVIDER: {
    BG_COLOR: UkDividerBgColor,
    MARGIN: UkDividerMargin,
    SIZE: UkDividerSize,
    DISPLAY: UkDividerDisplay,
  },
  DROPDOWN_INFO: {
    STATE: UkDropdownInfoState,
    BG_COLOR: UkDropdownInfoBgColor,
  },
  DESKTOP_FORM_PART: {
    CRUD_MODE: UkCrudMode,
    HAS_BORDER: UkBooleanType,
    TITLE_BOTTOM_BORDER: UkBooleanType,
    HAS_PADDINGS: UkBooleanType,
    BOTTOM_PADDING: UkBooleanType,
  },
  DESKTOP_FORM_ROW: {
    IS_DIVIDED: UkBooleanType,
    HAS_BORDER: UkBooleanType,
    IS_FLEX: UkBooleanType,
  },
  DESKTOP_MULTI_TAB: {
    HEADER_DISPLAY: UkDesktopMultiTabHeaderDisplay,
    HEADER_DIVIDER: UkBooleanType,
    SIDE_PADDINGS: UkBooleanType,
  },
  DESKTOP_SQUARE_CARD: {
    CURSOR: UkCursor,
  },
  EMPTY_STATE: {
    STYLE: UkEmptyStateStyle,
  },
  FILE_UPLOADER: {
    TYPE: UkFileUploaderType,
  },
  FILTER_SORT: {
    IS_FILTER_ACTIVE: UkBooleanType,
    IS_SORT_ACTIVE: UkBooleanType,
    SORT_ORDER: UkSortType,
  },
  FORM_PART: {
    BG_COLOR: UkFormBgColor,
    MODE: UkCrudMode,
    IS_DISABLED: UkBooleanType,
  },
  GROUP_BORDER: {
    MODE: UkGroupBorderMode,
  },
  HINT: {
    TYPE: UkHintType,
  },
  ICON: {
    FG_COLOR: UkIconFgColor,
    NAME: UkIconName,
    SIZE: UkIconSize,
    BORDER_COLOR: UkIconBorderColor,
    CURSOR: UkCursor,
  },
  ICON_TEXT: {
    CURSOR: UkCursor,
  },
  IMAGE: {
    OBJECT_FIT: UkImageObjectFit,
  },
  IMAGE_BOX: {
    PICTURE: UkImageBoxPicture,
    SIZE: UkImageBoxSize,
    CURSOR: UkCursor,
  },
  INPUT: {
    TYPE: UkInputType,
    BORDER_COLOR: UkInputBorderColor,
    INPUT_MODE: UkInputMode,
    NUMERIC: UkInputNumeric,
  },
  INPUT_SELECT: {},
  KEY_VAL: {
    HORIZONTAL_ALIGNMENT: UkKeyValHorizontalAlignment,
  },

  LINK: {
    TARGET: UkLinkTarget,
  },
  LIST_ITEM: {
    BOTTOM_BORDER: UkBooleanType,
    STATUS: UkListItemStatus,
  },
  LOADING: {
    COLOR: UkLoadingColor,
  },
  MODAL_FRAME: {
    SHOW_HEADER: UkBooleanType,
    DEVICE_MODE: UkDeviceMode,
    BORDER_RADIUS: UkModalFrameBorderRadius,
    PADDING: UkModalFramePadding,
    BACKGROUND_COLOR: UkPageBackgroundColor,
  },
  MULTI_TAB: {
    HEADER_DISPLAY: UkMultiTabHeaderDisplay,
    HEADER_DIVIDER: UkBooleanType,
    SIDE_PADDINGS: UkBooleanType,
  },
  PAGE: {
    TOP_MARGIN: UkBooleanType,
    HEADER_BACKGROUND_COLOR: UkPageBackgroundColor,
    BODY_BACKGROUND_COLOR: UkPageBackgroundColor,
    FOOTER_BACKGROUND_COLOR: UkPageBackgroundColor,
    BOTTOM_MARGIN: UkBooleanType,
    BODY_OVER_FLOW: UkPageBodyOverFlow,
  },
  PAGE_PART: {
    BACKGROUND_COLOR: UkPagePartBackgroundColor,
    SIDE_PADDINGS: UkPagePartSidePaddings,
    BOTTOM_MARGIN: UkPagePartBottomMargin,
    BODY_BACKGROUND_COLOR: UkPageBackgroundColor,
    TOP_PADDING: UkBooleanType,
    BOTTOM_PADDING: UkBooleanType,
    IS_FIRST_CHILD_STICK: UkBooleanType,
  },
  RICH_TEXT: {
    FG_COLOR: UkRichTextFgColor,
    TYPOGRAPHY: UkRichTextTypography,
    SIZE: UkRichTextSize,
  },
  ROW_LINK: {
    STATUS: UkRowLinkStatus,
    SHOW_BOTTOM: UkBooleanType,
  },
  SEARCH_BAR: {
    STATUS: UkSearchBarStatus,
    enableAnimation: UkBooleanType,
    DEVICE_MODE: UkDeviceMode,
    COLOR: UkSearchBarColor,
    BORDER_COLOR: UkSearchBarBorderColor,
  },
  SEARCH_FILTER: {
    SORT_TYPE: UkSearchFilterType,
    FILTER_ICON: UkIconName,
  },
  SELECT: {
    BG_COLOR: UkSelectBgColor,
    BORDER_COLOR: UkSelectBorderColor,
    FG_COLOR: UkSelectFgColor,
    BORDER_RADIUS: UkSelectBorderRadius,
    MULTI_SELECT: UkBooleanType,
    MARGIN_RIGHT: UkSelectMarginRight,
  },
  SHAPE_ICON: {
    SIZE: UkShapeIconSize,
    BG_COLOR: UkShapeIconBgColor,
    FG_COLOR: UkIconFgColor,
    TYPE: UkShapeIconType,
    ICON_NAME: UkIconName,
    ICON_SIZE: UkIconSize,
    BORDER_COLOR: UkIconBorderColor,
  },
  SCROLL: {
    SHOW_SCROLLBAR: UkBooleanType,
    CONTENT_HAS_SIDE_MARGIN: UkBooleanType,
    CONTENT_HAS_BOTTOM_MARGIN: UkBooleanType,
  },
  TABLE: {
    LAYOUT: UkTableLayoutTypes,
  },
  TABLE_CARD: {
    BG_COLOR: UkTableCardBgColor,
    SIZE: UkTableCardSize,
    HAS_ARROW: UkBooleanType,
  },
  TEXT: {
    BG_COLOR: UkTextBgColor,
    BORDER_RADIUS: UkTextBorderRadius,
    DISPLAY: UkTextDisplay,
    FG_COLOR: UkTextFgColor,
    HORIZONTAL_ALIGNMENT: UkTextHorizontalAlignment,
    TYPE: UkTextType,
    TYPOGRAPHY: UkTextTypography,
    NUMERIC: UkTextNumeric,
    PADDING: UkTextPadding,
    VERTICAL_ALIGNMENT: UkTextVerticalAlignment,
    TEXT_WRAP: UkTextTextWrap,
    WHITE_SPACE: UkTextWhiteSpace,
    DIRECTION: UkTextDirection,
  },
  TILE: {
    ICON_SIZE: UkTileIconSize,
    WIDTH: UkTileWidth,
    IS_SELECTED: UkBooleanType,
  },
  TIME_SELECT: {
    TIME_FORMAT: UkTimeFormat,
  },
  TEXT_AREA: {
    BORDER_COLOR: UkInputBorderColor,
  },
  UK: {
    BOOLEAN: UkBooleanType,
    SORT_TYPE: UkSortType,
    AUTO_BOOLEAN: UkAutoBooleanType,
    CRUD_MODE: UkCrudMode,
    TIME_FORMAT: UkTimeFormat,
    CURSOR: UkCursor,
  },
};
