<?php namespace AspenDigital\Backend;

use App;
use Backend;
use Event;
use System\Classes\PluginBase;

/**
 * Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name' => 'Backend Theme extension',
            'description' => 'Backend Theme extension for October CMS',
            'author' => 'Aspen Digital',
            'icon' => 'icon-leaf'
        ];
    }

    public function boot()
    {
        if (!App::runningInBackend()) {
            return;
        }

        Event::listen('backend.page.beforeDisplay', function($controller, $action, $params) {
            $controller->addCss('/plugins/aspendigital/backend/assets/css/styles.css', '1.0.1');
        });
    }
}
