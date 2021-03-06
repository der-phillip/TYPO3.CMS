/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import ThrottleEvent = require('TYPO3/CMS/Core/Event/ThrottleEvent');

class ValueSlider {
  private readonly selector: string = '[data-slider-id]';

  /**
   * Update value of slider element
   *
   * @param {HTMLInputElement} element
   */
  private static updateValue(element: HTMLInputElement): void {
    const foreignField = document.querySelector(`[data-formengine-input-name="${element.dataset.sliderItemName}"]`) as HTMLInputElement;
    const sliderCallbackParams = JSON.parse(element.dataset.sliderCallbackParams);

    foreignField.value = element.value;
    TBE_EDITOR.fieldChanged.apply(TBE_EDITOR, sliderCallbackParams);
  }

  /**
   * @param {HTMLInputElement} element
   */
  private static updateTooltipValue(element: HTMLInputElement): void {
    let renderedValue;
    const value = element.value;
    switch (element.dataset.sliderValueType) {
      case 'double':
        renderedValue = parseFloat(value).toFixed(2);
        break;
      case 'int':
      default:
        renderedValue = parseInt(value, 10);
    }

    element.title = renderedValue.toString();
  }

  constructor() {
    new ThrottleEvent('input', function (this: HTMLInputElement): void {
      ValueSlider.updateValue(this);
      ValueSlider.updateTooltipValue(this);
    }, 25).delegateTo(document, this.selector);
  }
}

export = new ValueSlider();
