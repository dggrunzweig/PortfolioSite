import {CreatePseudoFile, PseudoFile} from './VirtualDesktop';

// create fake files for desktop simulator
export const vd_files = new Array<PseudoFile>(
    CreatePseudoFile(
        'images/helmut_lang/cotton-chesterfield-coat.webp',
        'This classic Chesterfield coat is one of Lang\'s most iconic pieces, encapsulating his visually resolute and streamlined approach to power dressing.'),
    CreatePseudoFile(
        'images/helmut_lang/waffle-knit-shirt.jpg',
        'An unlikely find even for the most diligent Helmut Lang collectors, this T-Shirt is a strong example of Lang\'s iconic no-so-basic basics from a very distinctive moment in the history of contemporary fashion. '),
    CreatePseudoFile(
        'images/helmut_lang/abstract-print-shirt.webp',
        'A beautiful piece that combines everyday versatility with sophistication, this top is a signature creation from Helmut Lang\'s most prolific period as a designer. '),
    CreatePseudoFile(
        'images/helmut_lang/painter-jeans.webp',
        'Lang\'s iconic \'Painter Jean\' was introduced for S/S 1998 and is certainly one of his most celebrated denim creations. Nearly two decades after their release, they have become one of Lang\'s most coveted garments.'),
    CreatePseudoFile(
        'images/helmut_lang/tailored-biker-coat.webp',
        'An iconic Helmut Lang outerwear design, this coat captures the A/W 1999 collection\'s much-imitated aesthetic. Its superb quality, beautiful fabric and directional aesthetic will make it a wardrobe essential that you will reach for again and again.'),
    CreatePseudoFile(
        'images/helmut_lang/biker-parka-with-straps.webp',
        'Inspired by astronaut uniforms, motorcycle safety gear and rave subcultures, Lang created a subversively elegant and uncompromisingly modern universe that has since then inspired a long list of designers. '),
    CreatePseudoFile(
        'images/helmut_lang/cotton-padded-biker-coat.webp',
        'The parka has an oversized, unstructured silhouette; the shoulders are fairly defined, however the body is cut wide and straight for a dramatic shape with plenty of room for layering.'));
