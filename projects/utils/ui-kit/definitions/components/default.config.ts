import {
  UkButtonGroupAlignType,
  UkButtonGroupType,
  UkCircleIconBgColor,
  UkCircleIconSize,
  UkContactGroupContactSize,
  UkDateSelectInputMode,
  UkFileUploaderType,
  UkGroupBorderMode,
  UkImageBoxPicture,
  UkImageBoxSize,
  UkModalFrameBorderRadius,
  UkModalFramePadding,
  UkPagePartBackgroundColor,
  UkPagePartBottomMargin,
  UkPagePartSidePaddings,
  UkRichTextFgColor,
  UkRichTextNumeric,
  UkRichTextSize,
  UkRichTextTypography,
  UkSearchBarBorderColor,
  UkSearchBarColor,
  UkSearchBarStatus,
  UkShapeIconSize,
  UkShapeIconType,
  UkTableCardBgColor,
  UkTableCardSize,
} from '@utils/ui-kit/definitions';
import {
  UkEmptyStateStyle,
  UkEmptyStateType,
} from '@utils/ui-kit/definitions/components/empty-state/empty-state.type';

import {
  UkBasicCardBgColor,
  UkBasicCardBorderColor,
  UkBasicCardPadding,
  UkBasicCardRadius,
  UkChoiceItemsStatus,
  UkDatePickerType,
  UkDropdownInfoBgColor,
  UkDropdownInfoBorderColor,
  UkDropdownInfoState,
  UkImageObjectFit,
  UkInputFgColor,
  UkInputMask,
  UkInputTypography,
  UkLinkTarget,
  UkListItemStatus,
  UkMultiTabHeaderDisplay,
  UkShapeIconBgColor,
  UkTableLayoutTypes,
  UkTileWidth,
} from '../public-api';
import {
  UkBadgeBorderRadius,
  UkBadgeSize,
  UkBadgeType,
} from './badge/badge.type';
import {
  UkBannerContentStartStatus,
  UkBannerTopStatus,
} from './banner/banner.type';
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
import {UkDataBgColor, UkDataBorderColor} from './data/data.type';
import {UkDesktopMultiTabHeaderDisplay} from './desktop-multi-tab/desktop-multi-tab.type';
import {
  UkDividerBgColor,
  UkDividerDisplay,
  UkDividerMargin,
  UkDividerSize,
} from './divider/divider.type';
import {UkFormBgColor} from './form/form.type';
import {UkHintType} from './hint/hint.type';
import type {IconFgColor} from './icon/icon.type';
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
import {UkKeyValHorizontalAlignment} from './key-val/key-val.type';
import {UkLoadingColor} from './loading/loading.type';
import {UkPageBackgroundColor, UkPageBodyOverFlow} from './page/page.type';
import {UkRowLinkStatus} from './row-link/row-link.type';
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
  UkTextWordBreak,
} from './text/text.type';
import {
  UkAutoBooleanType,
  UkBooleanType,
  UkCrudMode,
  UkCursor,
  UkDeviceMode,
  UkSortType,
  UkTimeFormat,
} from './uk/uk.type';

const SIMPLE = {
  badge: {
    badgeType: UkBadgeType.SECONDARY,
    size: UkBadgeSize.MEDIUM,
    isOutline: UkBooleanType.FALSE,
    cursor: UkCursor.NORMAL,
    borderRadius: UkBadgeBorderRadius.PX_100,
  },
  breadcrumb: {
    cursor: UkCursor.NORMAL,
  },
  basicCard: {
    padding: UkBasicCardPadding.NONE,
    bgColor: UkBasicCardBgColor.SECONDARY_OPACITY_50,
    radius: UkBasicCardRadius.R_16,
    borderColor: UkBasicCardBorderColor.SECONDARY_700,
  },
  banner: {
    topStatus: UkBannerTopStatus.H_150,
    contentStartStatus: UkBannerContentStartStatus.H_65_SQUARE,
    cursor: UkCursor.POINTER,
  },
  button: {
    bgColor: UkButtonBgColor.BUTTON_PRIMARY,
    display: UkButtonDisplay.INLINE,
    style: UkButtonStyle.NONE,
    borderColor: UkButtonBorderColor.TRANSPARENT,
    padding: UkButtonPadding.NORMAL,
    type: UkButtonType.BUTTON,
    cursor: UkCursor.POINTER,
    ukType: UkButtonUkType.NONE,
    height: UkButtonHeight.H_48,
    // label
    typography: UkTextTypography.BUTTON_1,
    fgColor: UkTextFgColor.CONTENT_LIGHT,
    horizontalAlignment: UkTextHorizontalAlignment.CENTER,
    borderRadius: UkButtonBorderRadius.R_08,
  },
  buttonGroup: {
    type: UkButtonGroupType.HORIZONTAL,
    alignType: UkButtonGroupAlignType.CENTER,
  },
  choiceItems: {
    status: UkChoiceItemsStatus.NORMAL,
  },
  circleIcon: {
    bgColor: UkCircleIconBgColor.LOVE_300,
    size: UkCircleIconSize.MEDIUM,
  },
  contactGroupAvatar: {
    contactSize: UkContactGroupContactSize.LARGE,
  },
  contactItem: {
    isSelected: UkBooleanType.FALSE,
    rightBorder: UkBooleanType.FALSE,
  },
  data: {
    bgColor: UkDataBgColor.BACKGROUND_SURFACE_00,
    borderColor: UkDataBorderColor.TRANSPARENT,
  },
  datePicker: {
    type: UkDatePickerType.POPUP,
    cursor: UkCursor.POINTER,
  },
  dateSelect: {
    crudMode: UkCrudMode.EDIT,
    showDefault: UkBooleanType.TRUE,
    inputMode: UkDateSelectInputMode.SEPARATE,
  },
  divider: {
    bgColor: UkDividerBgColor.GRADE_2,
    size: UkDividerSize.PX_1,
    margin: UkDividerMargin.NONE,
    display: UkDividerDisplay.HORIZONTAL,
  },
  dropdownInfo: {
    state: UkDropdownInfoState.UP,
    bgColor: UkDropdownInfoBgColor.BACKGROUND_PRIMARY_01,
    borderColor: UkDropdownInfoBorderColor.GRAY,
  },
  desktopFormPart: {
    crudMode: UkCrudMode.EDIT,
    hasBorder: UkBooleanType.TRUE,
    titleBottomBorder: UkBooleanType.TRUE,
    hasPaddings: UkBooleanType.TRUE,
    bottomPadding: UkBooleanType.FALSE,
  },
  desktopFormRow: {
    isDivided: UkBooleanType.TRUE,
    hasBorder: UkBooleanType.TRUE,
    isFlex: UkBooleanType.FALSE,
  },
  desktopMultiTab: {
    headerDisplay: UkDesktopMultiTabHeaderDisplay.BLOCK,
    headerDivider: UkBooleanType.FALSE,
    sidePaddings: UkBooleanType.TRUE,
  },
  desktopSquareCard: {
    cursor: UkCursor.DEFAULT,
  },
  emptyState: {
    iconFgColor: UkIconFgColor.CONTENT_PRIMARY,
    style: UkEmptyStateStyle.PRE_DEFINED,
    type: UkEmptyStateType.ICON,
    iconName: UkIconName.DIZZY,
  },
  fileUploader: {
    type: UkFileUploaderType.IMAGE,
  },
  filterKeys: {
    showDeleteAll: true,
    deleteAllText: 'حدف همه فیلترها',
    keyInfos: [],
  },
  filterSort: {
    isFilterActive: UkBooleanType.TRUE,
    isSortActive: UkBooleanType.TRUE,
    sortOrder: UkSortType.ACS,
  },
  form: {
    formPart: {
      backgroundColor: UkFormBgColor.TRANSPARENT,
      mode: UkCrudMode.EDIT,
      isDisabled: UkBooleanType.FALSE,
    },
  },
  groupBorder: {
    mode: UkGroupBorderMode.SOLID,
  },
  groupColorSelector: {
    crudMode: UkCrudMode.EDIT,
  },
  hint: {
    type: UkHintType.ERROR,
    iconName: UkIconName.INFO_CIRCLE,
    iconFgColor: UkIconFgColor.CONTENT_ERROR,
    textFgColor: UkTextFgColor.CONTENT_ERROR,
  },
  icon: {
    fgColor: UkIconFgColor.CONTENT_LOW_EMPHASIS,
    name: UkIconName.AT,
    size: UkIconSize.MEDIUM,
    borderColor: UkIconBorderColor.TRANSPARENT,
    cursor: UkCursor.NORMAL,
  },
  iconText: {
    cursor: UkCursor.DEFAULT,
  },
  image: {
    source: 'uk-images/default/no-image.jpg',
    objectFit: UkImageObjectFit.COVER,
  },
  imageBox: {
    picture: UkImageBoxPicture.EMPTY,
    size: UkImageBoxSize.FLOAT,
    cursor: UkCursor.DEFAULT,
  },
  input: {
    type: UkInputType.TEXT,
    borderColor: UkInputBorderColor.GRADE_2,
    numeric: UkInputNumeric.PERSIAN,
    inputMode: UkInputMode.NULL,
    crudMode: UkCrudMode.EDIT,
    typography: UkInputTypography.SUBTITLE,
    fgColor: UkInputFgColor.CONTENT_HIGH_EMPHASIS,
    mask: UkInputMask.SEPARATOR,
  },
  inputSelect: {},
  keyVal: {
    horizontalAlignment: UkKeyValHorizontalAlignment.SPACE_BETWEEN,
  },
  text: {
    horizontalAlignment: UkTextHorizontalAlignment.START,
    verticalAlignment: UkTextVerticalAlignment.CENTER,
    bgColor: UkTextBgColor.TRANSPARENT,
    fgColor: UkTextFgColor.CONTENT_DARK,
    typography: UkTextTypography.H_5,
    type: UkTextType.NONE,
    display: UkTextDisplay.INLINE_FLEX,
    padding: UkTextPadding.NONE,
    borderRadius: UkTextBorderRadius.NONE,
    numeric: UkTextNumeric.PERSIAN,
    direction: UkTextDirection.RIGHT_TO_LEFT,
    textWrap: UkTextTextWrap.WRAP,
    whiteSpace: UkTextWhiteSpace.WRAP,
    wordBreak: UkTextWordBreak.BREAK_WORD,
  },
  link: {
    target: UkLinkTarget.BLANK,
  },
  listItem: {
    bottomBorder: UkAutoBooleanType.FALSE,
    startIconFgColor: 'AUTO' as IconFgColor | 'AUTO',
    fgColor1: UkTextFgColor.CONTENT_DARK,
    fgColor2: UkTextFgColor.CONTENT_LOW_EMPHASIS,
    status: UkListItemStatus.TRANSPARENT,
    cursor: UkCursor.POINTER,
  },
  loading: {
    color: UkLoadingColor.GRAY_HIGH,
  },
  modalFrame: {
    showHeader: UkBooleanType.TRUE,
    deviceMode: UkDeviceMode.MOBILE,
    borderRadius: UkModalFrameBorderRadius.TOP,
    hideBottomFrame: false,
    bodyBackgroundColor: UkPageBackgroundColor.TRANSPARENT,
    padding: UkModalFramePadding.DEFAULT,
  },
  multiTab: {
    headerDisplay: UkMultiTabHeaderDisplay.BLOCK,
    headerDivider: UkBooleanType.FALSE,
    sidePaddings: UkBooleanType.TRUE,
  },
  page: {
    headerBackgroundColor: UkPageBackgroundColor.TRANSPARENT,
    topMargin: UkBooleanType.FALSE,
    bodyBackgroundColor: UkPageBackgroundColor.TRANSPARENT,
    bottomMargin: UkBooleanType.FALSE,
    footerBackgroundColor: UkPageBackgroundColor.TRANSPARENT,
    bodyOverFlow: UkPageBodyOverFlow.UNSET,
  },
  pagePart: {
    isFirstChildStick: UkBooleanType.FALSE,
    bottomMargin: UkPagePartBottomMargin.AUTO,
    backgroundColor: UkPagePartBackgroundColor.TRANSPARENT,
    sidePaddings: UkPagePartSidePaddings.BOTH,
    topPadding: UkBooleanType.FALSE,
    bottomPadding: UkBooleanType.FALSE,
  },
  richText: {
    fgColor: UkRichTextFgColor.FG_MILK_800,
    typography: UkRichTextTypography.W500,
    size: UkRichTextSize.S14,
    numeric: UkRichTextNumeric.PERSIAN,
  },
  rowLink: {
    status: UkRowLinkStatus.ROW,
    startIconName: UkIconName.AT,
    endIconName: UkIconName.AT,
    showBottom: UkBooleanType.FALSE,
  },
  searchBar: {
    status: UkSearchBarStatus.ACTIVE,
    enableAnimation: UkBooleanType.FALSE,
    deviceMode: UkDeviceMode.MOBILE,
    color: UkSearchBarColor.SECONDARY,
    selectBgColor: UkSelectBgColor.BACKGROUND_SECONDARY,
    buttonBgColor: UkButtonBgColor.BUTTON_PRIMARY,
    borderColor: UkSearchBarBorderColor.SECONDARY,
  },
  select: {
    bgColor: UkSelectBgColor.BACKGROUND_SURFACE_00,
    fgColor: UkSelectFgColor.FG_MILK_800,
    borderColor: UkSelectBorderColor.GRADE_2,
    borderRadius: UkSelectBorderRadius.SMALL,
    multiSelect: UkBooleanType.FALSE,
    marginRight: UkSelectMarginRight.M10,
  },
  shapeIcon: {
    size: UkShapeIconSize.MEDIUM,
    bgColor: UkShapeIconBgColor.OPACITY_PRIMARY_00,
    fgColor: UkIconFgColor.BUTTON_PRIMARY,
    type: UkShapeIconType.SQUARE,
    iconName: UkIconName.AT,
    iconSize: UkIconSize.MEDIUM,
    borderColor: UkIconBorderColor.TRANSPARENT,
  },
  stepper: {
    isReadonly: false,
  },
  switch: {
    cursor: UkCursor.POINTER,
  },
  scroll: {
    showScrollbar: UkBooleanType.FALSE,
    contentHasSideMargin: UkBooleanType.FALSE,
    contentHasBottomMargin: UkBooleanType.FALSE,
  },
  table: {
    layout: UkTableLayoutTypes.SCROLL,
  },
  tableCard: {
    size: UkTableCardSize.MEDIUM,
    bgColor: UkTableCardBgColor.BACKGROUND_SURFACE_00,
    hasArrow: UkBooleanType.TRUE,
  },
  tile: {
    iconName: UkIconName.AT,
    width: UkTileWidth.W_100,
    cursor: UkCursor.POINTER,
    isSelected: UkBooleanType.FALSE,
  },
  timeSelect: {
    timeFormat: UkTimeFormat.T_24H,
  },
  textArea: {
    borderColor: UkInputBorderColor.GRADE_2,
  },
};

export const DEFAULT = SIMPLE;
