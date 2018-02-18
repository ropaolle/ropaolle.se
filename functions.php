<?php

// Include Beans. Do not remove the line below.
require_once( get_template_directory() . '/lib/init.php' );

/*
 * Remove this action and callback function if you do not whish to use LESS to style your site or overwrite UIkit variables.
 * If you are using LESS, make sure to enable development mode via the Admin->Appearance->Settings option. LESS will then be processed on the fly.
 */
add_action( 'beans_uikit_enqueue_scripts', 'beans_child_enqueue_uikit_assets' );

function beans_child_enqueue_uikit_assets() {

	beans_compiler_add_fragment( 'uikit', get_stylesheet_directory_uri() . '/style.less', 'less' );

}

// Add edit post link
add_action( 'beans_post_body_append_markup', 'example_edit_post' );

function example_edit_post() {
    ?><p class="uk-margin-bottom-remove"><?php edit_post_link(); ?></p><?php
}

// Modify the footer credit right text.
add_filter( 'beans_footer_credit_right_text_output', 'example_footer_credit_right_text' );

function example_footer_credit_right_text() {

	if ( $logo = get_theme_mod( 'beans_logo_image', false ) ) {
		$data = beans_selfclose_markup_e( 'beans_logo_image', 'img', array(
			'class' => 'tm-logo2',
			'src'   => $logo, // Automatically escaped.
			'alt'   => get_bloginfo( 'name' ), // Automatically escaped.
		) );
	}

	return '<a title="RopaOlles Twitter Account" target="_blank" href="https://twitter.com/RopaOlle"><i class="uk-icon-twitter uk-icon-medium"></i></a>' .
		   '<a title="RopaOlles GitHub Account" target="_blank" href="https://github.com/RopaOlle"><i class="uk-icon-github uk-icon-medium"></i></a>' .
		   $data;
}

// Register a footer widget area.
add_action( 'widgets_init', 'example_widget_area' );

function example_widget_area() {

    beans_register_widget_area( array(
        'name' => 'Footer',
        'id' => 'footer',
        'beans_type' => 'grid'
    ) );

}

// Display the footer widget area in the front end.
add_action( 'beans_footer_before_markup', 'example_footer_widget_area' );

function example_footer_widget_area() {

	?>
	<div class="tm-mega-footer uk-block">
		<div class="uk-container uk-container-center">
			<?php echo beans_widget_area( 'footer' ); ?>
		</div>
	</div>
	<?php

}

// Modify site branding
beans_modify_action_callback( 'beans_header', 'modify_beans_site_branding' );

function modify_beans_site_branding() {

	beans_open_markup_e( 'beans_site_branding', 'div', array(
		'class' => 'tm-site-branding uk-float-left' . ( ! get_bloginfo( 'description' ) ? ' uk-margin-small-top' : null ),
	) );

		beans_open_markup_e( 'beans_site_title_link', 'a', array(
			'href'     => home_url(), // Automatically escaped.
			'rel'      => 'home',
			'itemprop' => 'headline',
		) );

			if ( $logo = get_theme_mod( 'beans_logo_image', false ) ) {
				beans_selfclose_markup_e( 'beans_logo_image', 'img', array(
					'class' => 'tm-logo2',
					'src'   => $logo, // Automatically escaped.
					'alt'   => get_bloginfo( 'name' ), // Automatically escaped.
				) );				
			} else {
				beans_output_e( 'beans_site_title_text', get_bloginfo( 'name' ) );
			}

		beans_close_markup_e( 'beans_site_title_link', 'a' );

	beans_close_markup_e( 'beans_site_branding', 'div' );

}