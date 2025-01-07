import { marked, type Tokens } from 'marked';

export interface MarkdownToHtmlConfig {
	[key: string]: string | undefined;
}

/**
 * This is a helper class used to convert Markdown to HTML.
 */
export class MarkdownToHtml {
	private _parser: typeof marked;

	private _options = {
		gfm: true,
		breaks: true,
		tables: true,
		xhtml: true,
		headerIds: false,
		async: false
	};

	constructor( config: MarkdownToHtmlConfig | undefined ) {
		// Create dynamic renderer configuration
		const customRenderers = Object.entries( config || {} ).reduce( ( acc, [ token, tag ] ) => {
			if ( tag ) {
				acc[ token ] = function( tokenObj: Tokens.Generic ): string {
					return `<${ tag }>${ tokenObj.text }</${ tag }>`;
				};
			}
			return acc;
		}, {} as Record<string, Function> );

		marked.use( {
			tokenizer: {
				// Disable the autolink rule in the lexer.
				autolink: () => null as any,
				url: () => null as any
			},
			renderer: {
				...customRenderers,

				checkbox( ...args: Array<any> ) {
					// Remove bogus space after <input type="checkbox"> because it would be preserved
					// by DomConverter as it's next to an inline object.
					return Object.getPrototypeOf( this ).checkbox.call( this, ...args ).trimRight();
				},

				code( ...args: Array<any> ) {
					// Since marked v1.2.8, every <code> gets a trailing "\n" whether it originally
					// ended with one or not (see https://github.com/markedjs/marked/issues/1884 to learn why).
					// This results in a redundant soft break in the model when loaded into the editor, which
					// is best prevented at this stage. See https://github.com/ckeditor/ckeditor5/issues/11124.
					return Object.getPrototypeOf( this ).code.call( this, ...args ).replace( '\n</code>', '</code>' );
				}
			}
		} );

		this._parser = marked;
	}

	public parse( markdown: string ): string {
		return this._parser.parse( markdown, this._options ) as string;
	}
}
