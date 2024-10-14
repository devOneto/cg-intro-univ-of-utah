/**
 * 
 * @param {*} bg_img is the background image to be modified.
 * @param {*} fg_img fgImg is the foreground image.
 * @param {*} fg_opac fgOpac is the opacity of the foreground image.
 * @param {*} fg_pos fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
**/
function composite( bg_img, fg_img, fg_opac, fg_pos )
{
    let type = document.getElementById("blend_type").value;

    for ( let x = 0; x < fg_img.width; x++ ) {
        for (let y = 0; y < fg_img.height; y++) {
            
            let bg_x = x + fg_pos.x;
            let bg_y = y + fg_pos.y;

            let fg_pixel_index = ( y * fg_img.width + x ) * 4;
            let bg_pixel_index = ( bg_y * fg_img.width + bg_x) * 4 

            if ( 
                bg_y < 0 || bg_y >= bg_img.height ||
                bg_x < 0 || bg_x >= bg_img.width
            ) continue;

            let fg_r = fg_img.data[ fg_pixel_index ];
            let fg_g = fg_img.data[ fg_pixel_index + 1];
            let fg_b = fg_img.data[ fg_pixel_index + 2];
            let fg_a = normalize_alpha(fg_img.data[ fg_pixel_index + 3]);

            let bg_r = bg_img.data[ bg_pixel_index ];
            let bg_g = bg_img.data[ bg_pixel_index + 1];
            let bg_b = bg_img.data[ bg_pixel_index + 2];
            let bg_a = normalize_alpha(bg_img.data[ bg_pixel_index + 3]);
            
            fg_a = fg_a * fg_opac;
            
            switch( type ){
                case "alpha_blending":
                    let r_a = fg_a + ( 1 - fg_a ) * bg_a;
                    bg_img.data[bg_pixel_index] = alpha_blend(fg_r, fg_a, bg_r, bg_a, r_a);
                    bg_img.data[bg_pixel_index+1] = alpha_blend(fg_g, fg_a, bg_g, bg_a, r_a);
                    bg_img.data[bg_pixel_index+2] = alpha_blend(fg_b, fg_a, bg_b, bg_a, r_a);
                    // bg_img.data[bg_pixel_index+3] = alpha_blend(fg_b, fg_a, bg_b, bg_a, r_a);
                break;
            }

        }
    }
}

function normalize_alpha( alpha ) { return alpha/255; }

function alpha_blend( fg_c, fg_a, bg_c, bg_a, r_a ) {
    if ( r_a == 0 ) return 0;
    return (fg_a * fg_c + ( 1 - fg_a ) * bg_a * bg_c) / r_a;  
}