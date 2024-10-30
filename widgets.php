<?php

/**
Copyright 2018 at getcopyfight.com (email: info@getcopyfight.com)
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

function copyfight_register_widgets() {
    register_widget( 'Copyfight_Widget' );
}
add_action( 'widgets_init', 'copyfight_register_widgets' );

class Copyfight_Widget extends WP_Widget
{
    function Copyfight_Widget() {
        parent::__construct(
            'Copyfight_Widget',
            'Copyfight',
            array( 'description' => __( 'Widget for Copyfight.', 'copyfight' ) )
        );
    }

    function widget( $args, $instance ) {
        echo $args['before_widget'];
        echo '<h2 class="widget-title">' . $instance['title'] . '</h2>';
        echo '<p>';
        echo '<a href="' . COPYFIGHT_HOME . '" target="_blank">';
        echo '<img class="copyfight_widget" src="' . COPYFIGHT_PLUGIN_URL . '_inc/img/copyfight-logo-' . $instance['logo'] . '.svg" alt="' . __('Protected by Copyfight', 'copyfight') . '">';
        echo '</a>';
        echo '</p>';
        echo $args['after_widget'];
    }

    function update( $new_instance, $old_instance ) {
        $instance = $old_instance;
        $instance['title'] = strip_tags( $new_instance['title'] );
        $instance['logo'] = strip_tags( $new_instance['logo'] );
        return $instance;
    }

    function form( $instance ) {
        $title = '';
        $logo = '';

        if ( $instance ) {
            $instance = wp_parse_args( (array) $instance, array( 'title' => __( 'Protected by Copyfight', 'copyfight' ) ) );
            $title = esc_attr( $instance['title'] );
            $logo = esc_attr( $instance['logo'] );
        } ?>

        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'copyfight' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>" />
        </p>

        <p>
            <label for="<?php echo $this->get_field_id( 'logo' ); ?>"><?php _e( 'Logo:', 'copyfight' ); ?></label>
            <select class="widefat" id="<?php echo $this->get_field_id( 'logo' ); ?>" name="<?php echo $this->get_field_name( 'logo' ); ?>">
                <option <?php if ( $logo == 'color' ) { echo 'selected '; } ?>value="color"><?php _e( 'Color', 'copyfight' ); ?></option>';
                <option <?php if ( $logo == 'dark' ) { echo 'selected '; } ?>value="dark"><?php _e( 'Dark', 'copyfight' ); ?></option>';
                <option <?php if ( $logo == 'light' ) { echo 'selected '; } ?>value="light"><?php _e( 'Light', 'copyfight' ); ?></option>';
            </select>
        </p>

    <?php }
}
