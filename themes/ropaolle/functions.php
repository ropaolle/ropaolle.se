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

	return '<a title="RopaOlles Twitter Account" target="_blank" href="https://twitter.com/RopaOlle"><i class="uk-icon-twitter uk-icon-medium"></i></a>' .
		   '<a title="RopaOlles GitHub Account" target="_blank" href="https://github.com/RopaOlle"><i class="uk-icon-github uk-icon-medium"></i></a>';

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
beans_modify_action_callback( 'beans_site_branding', 'modify_beans_site_branding' );

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
					'class' => 'tm-logo',
					'src'   => str_replace( 'http://', 'https://', $logo ), // Automatically escaped.
					'alt'   => get_bloginfo( 'name' ), // Automatically escaped.
				) );				
			}
			beans_output_e( 'beans_site_title_text', get_bloginfo( 'name' ) );

		beans_close_markup_e( 'beans_site_title_link', 'a' );

	beans_close_markup_e( 'beans_site_branding', 'div' );

}

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
	 
// Customize login page - https://premium.wpmudev.org/blog/customize-login-page/
function my_custom_login() {
	echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/style-custom-login.css" />';
}

add_action('login_head', 'my_custom_login');


// Add custom fields
add_action( 'admin_init', 'example_register_post_meta' );

function example_register_post_meta() {

	// https://www.getbeans.io/documentation/field-types/
    $fields = array(
        array(
            'id'    => 'field_portfolio_github_repository',
            'label' => __( 'GitHub Repository', 'ropaolle' ),
            'type'  => 'text',
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
function add_badge($field_id, $image_name, $alt, $add_link = false) {

    $theme_path = get_stylesheet_directory_uri();
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
				'src'   => $theme_path . '/' . $image_name,
				'alt'   => __( $alt, 'ropaolle' ),
			) );

		beans_close_markup_e( 'beans_badge_link', 'a' );
	
	} else {

        beans_selfclose_markup_e( 'badge', 'img', array(
            'class' => 'badge-img',
            'src'   => $theme_path . '/' . $image_name,
            'alt'   => __( $alt, 'ropaolle' ),
        ) );
		
	}
}

beans_add_smart_action( 'beans_add_portfolio_badges', 'beans_do_add_portfolio_badges' );

function beans_do_add_portfolio_badges() {

    add_badge('field_portfolio_github_repository', 'badge-repository.svg', 'GitHub repository', true);
    add_badge('field_portfolio_demo', 'badge-demo.svg', 'GitHub Pages', true);
    add_badge('field_portfolio_license', 'badge-license-mit.svg', 'MIT License', false);

}
