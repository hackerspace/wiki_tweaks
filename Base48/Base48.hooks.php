<?php
// Validate entrypoint.
if ( !defined( 'MEDIAWIKI' ) ) {
  die( 'This file is a MediaWiki extension, it is not a valid entry point' );
}

class Base48Hooks {
  public function __construct() {
    global $wgHooks;
    $wgHooks['BeforePageDisplay'][] = 'Base48Hooks::leet';
  }

  public static function leet(&$out, &$skin) {
    global $wgScriptPath;
    //$out->addScriptFile($wgScriptPath . '/extensions/Base48/common.js');
    $out->addStyle($wgScriptPath . '/extensions/Base48/common.css');
    return true;
  }
}
?>
