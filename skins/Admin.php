<?php namespace AspenDigital\Backend\Skins;

use Backend\Classes\Skin;

/**
 * Custom skin information file
 *
 * @package aspendigital\backend
 * @author Aspen Digital
 */

class Admin extends Skin
{

  /**
   * {@inheritDoc}
   */
  public function skinDetails()
  {
    return [
      'name' => 'Backend skin'
    ];
  }

}
