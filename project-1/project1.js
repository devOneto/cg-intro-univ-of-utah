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

    for ( let i = 0; i < bg_img.data.length; i+=4 ) {
        
        const element = bg_img.data[i];
        
        let bg_r = bg_img.data[i];
        let bg_g = bg_img.data[i+1];
        let bg_b = bg_img.data[i+2];
        let bg_a = normalize_alpha(bg_img.data[i+3]);

        let fg_r = fg_img.data[i];
        let fg_g = fg_img.data[i+1];
        let fg_b = fg_img.data[i+2];
        let fg_a = normalize_alpha(fg_img.data[i+3]);        

        fg_a = fg_a * fg_opac;

        switch( type ){
            case "alpha_blending":
                let r_a = fg_a + bg_a * ( 1 - fg_a );
                bg_img.data[i] = alpha_blend(fg_r, fg_a, bg_r, bg_a, r_a);
                bg_img.data[i+1] = alpha_blend(fg_g, fg_a, bg_g, bg_a, r_a);
                bg_img.data[i+2] = alpha_blend(fg_b, fg_a, bg_b, bg_a, r_a);
                // bg_img.data[i+3] = r_a;
                break;
            case "aditive_blending": console.log("b"); break; 
            case "difference_blending": console.log("c"); break;
            case "multiplicative_blending": console.log("d"); break;
        }

    }
}

function normalize_alpha( alpha ) { return alpha/255; }

function alpha_blend( fg_c, fg_a, bg_c, bg_a, r_a ) {
    
    if ( r_a == 0 ) return 0;
    
    return (fg_a * fg_c + ( 1 - fg_a ) * bg_a * bg_c) / r_a;  
}

function clamp ( value ) { 
    if ( value < 0 ) return 0;
    if ( value > 1 ) return 1;
    return value;
}