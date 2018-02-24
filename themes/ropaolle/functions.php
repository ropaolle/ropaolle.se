<?php
/**
 * Generic theme functions
 *
 * @package Ropaolle
 */

// Include Beans.
require_once( get_template_directory() . '/lib/init.php' );

/*
 * If you are using LESS, make sure to enable development mode via the Admin->Appearance->Settings option. LESS will then be processed on the fly.
 */
add_action( 'beans_uikit_enqueue_scripts', 'beans_child_enqueue_uikit_assets' );

function beans_child_enqueue_uikit_assets() {

	beans_compiler_add_fragment( 'uikit', get_stylesheet_directory_uri() . '/assets/less/style.less', 'less' );

}

/**
 * Customize login
 *
 * @since 1.1.0
 */

// Add login/logout link to the primary menu
add_filter('wp_nav_menu_items', 'add_login_logout_link', 10, 2);
     
function add_login_logout_link($nav, $args) {
	ob_start();
	wp_loginout('index.php');
	$loginoutlink = ob_get_contents();
	ob_end_clean();
	
	if( $args->theme_location == 'primary' ) {
		$nav .= '<li class="login-link">'. $loginoutlink .'</li>';
	}
			
	return $nav;
  }
	 
// Customize login page - https://codex.wordpress.org/Customizing_the_Login_Form
add_action('login_head', 'ropaolle_custom_login');

function ropaolle_custom_login() {
	beans_selfclose_markup_e( 'beans_custom_login', 'link', array(
		'rel' => 'stylesheet',
		'type' => 'text/css',
		'href' => get_bloginfo('stylesheet_directory') . '/assets/custom-login/style-custom-login.css',
	) );
}

/**
 * Modify site branding
 *
 * @since 1.0.0
 */
beans_modify_action_callback( 'beans_site_branding', 'ropaolle_site_branding' );

function ropaolle_site_branding() {

	beans_open_markup_e( 'beans_site_branding', 'div', array(
		'class' => 'tm-site-branding uk-float-left' . ( ! get_bloginfo( 'description' ) ? ' uk-margin-small-top' : null ),
	) );

		beans_open_markup_e( 'beans_site_title_link', 'a', array(
			'href'     => home_url(),
			'rel'      => 'home',
			'itemprop' => 'headline',
		) );

			if ( $logo = get_theme_mod( 'beans_logo_image', false ) ) {
				beans_selfclose_markup_e( 'beans_logo_image', 'img', array(
					'class' => 'tm-logo',
					'src'   => str_replace( 'http://', 'https://', $logo ), // Automatically escaped.
					'alt'   => get_bloginfo( 'name' ), // Automatically escaped.
				) );				
			}
			beans_output_e( 'beans_site_title_text', get_bloginfo( 'name' ) );

		beans_close_markup_e( 'beans_site_title_link', 'a' );

	beans_close_markup_e( 'beans_site_branding', 'div' );

}

/**
 * Customize all posts
 *
 * @since 1.0.0
 */

// Add edit post link
add_action( 'beans_post_body_append_markup', 'ropaolle_edit_post' );

function ropaolle_edit_post() {
    ?><p class="uk-margin-bottom-remove"><?php edit_post_link(); ?></p><?php
}

/**
 * Customize footer
 *
 * @since 1.0.0
 */

// Register a footer widget area.
add_action( 'widgets_init', 'ropaolle_widget_area' );

function ropaolle_widget_area() {

    beans_register_widget_area( array(
        'name' => 'Footer',
        'id' => 'footer',
        'beans_type' => 'grid'
    ) );

}

// Display the footer widget area in the front end.
add_action( 'beans_footer_before_markup', 'ropaolle_footer_widget_area' );

function ropaolle_footer_widget_area() {

	?>
	<div class="tm-mega-footer uk-block">
		<div class="uk-container uk-container-center">
			<?php echo beans_widget_area( 'footer' ); ?>
		</div>
	</div>
	<?php

}

// Modify the footer credit right text.
add_filter( 'beans_footer_credit_right_text_output', 'ropaolle_footer_credit_right_text' );

function ropaolle_footer_credit_right_text() {

	?>
	<a title="RopaOlle's Twitter Account" target="_blank" href="https://twitter.com/RopaOlle">
		<i class="uk-icon-twitter uk-icon-medium"></i>
	</a>
	<a title="RopaOlle's GitHub Account" target="_blank" href="https://github.com/RopaOlle">
		<i class="uk-icon-github uk-icon-medium"></i>
	</a>
	<?php

}

/**
 * Customize Jetpack portfolio posts
 *
 * @since 1.0.0
 */

// Add custom fields
add_action( 'admin_init', 'ropaolle_register_post_meta' );

function ropaolle_register_post_meta() {

    $fields = array(
        array(
            'id'    => 'field_portfolio_github_repository',
            'label' => __( 'GitHub Repository', 'ropaolle' ),
            'type'  => 'text', // https://www.getbeans.io/documentation/field-types/
		),
        array(
            'id'    => 'field_portfolio_demo',
            'label' => __( 'Demo site', 'ropaolle' ),
            'type'  => 'text',
		),		
		array(
            'id'    => 'field_portfolio_license',
            'label' => __( 'License', 'ropaolle' ),
            'type'  => 'text',
        ),
    );

    beans_register_post_meta( $fields, array( 'jetpack-portfolio' ), 'repository_information_section', array(
        'title' => __( 'Repository information', 'ropaolle' ),
    ) );

}

// Add portfolio badges
add_action( 'beans_post_content_prepend_markup', 'ropaolle_add_portfolio_badges' );

function ropaolle_add_portfolio_badges() {

	if ( get_post_type() !== 'jetpack-portfolio' ) return;

    ropaolle_add_badge('field_portfolio_github_repository', 'badge-repository.svg', 'GitHub repository', true);
    ropaolle_add_badge('field_portfolio_demo', 'badge-demo.svg', 'GitHub Pages', true);
    ropaolle_add_badge('field_portfolio_license', 'badge-license-mit.svg', 'MIT License', false);

}

function ropaolle_add_badge($field_id, $image_name, $alt, $add_link = false) {

	$images_path = get_stylesheet_directory_uri() . '/assets/images/';
    $field_text = beans_get_post_meta( $field_id, '' );

	if (empty($field_text)) return;

	if ($add_link) {
	
		beans_open_markup_e( 'beans_badge_link', 'a', array(
			'class' => 'badge-link',
			'href' => $field_text,
			'target' => '_blank',
		) );

			beans_selfclose_markup_e( 'badge', 'img', array(
				'class' => 'badge-img',
				'src'   => $images_path . $image_name,
				'alt'   => __( $alt, 'ropaolle' ),
			) );

		beans_close_markup_e( 'beans_badge_link', 'a' );
	
	} else {

        beans_selfclose_markup_e( 'badge', 'img', array(
            'class' => 'badge-img',
            'src'   => $images_path . $image_name,
            'alt'   => __( $alt, 'ropaolle' ),
        ) );
		
	}
}

// Force layout
beans_add_filter( 'beans_layout', 'ropaolle_force_layout' );

function ropaolle_force_layout() {

	if ( get_post_type() === 'jetpack-portfolio' ) return 'sp_c';

    return beans_get_default_layout();

}
