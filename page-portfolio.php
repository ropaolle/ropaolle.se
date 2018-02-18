<?php

add_action( 'beans_header_after_markup', 'beans_child_view_add_title' );

function beans_child_view_add_title() {

	?>
	<div class="uk-container uk-container-center">
		<h1>Added Title portfolio.php</h1>
	</div>
	<?php

}


add_action( 'beans_content_prepend_markup', 'beans_child_view_add_description' );

function beans_child_view_add_description() {

	?><p>Added description portfolio.php</p><?php

}

// Remove post image.
beans_remove_action( 'beans_post_image' );

// Load Beans document.
beans_load_document();

