import {
	HtmlDataProcessor,
	type DataProcessor,
	type ViewDocumentFragment,
	type MatcherPattern,
	type Editor
} from 'ckeditor5';

import { MarkdownToHtml, type MarkdownToHtmlConfig } from './markdown2html/markdown2html.js';
import { HtmlToMarkdown, type HtmlElementName } from './html2markdown/html2markdown.js';

/**
 * This data processor implementation uses GitHub Flavored Markdown as input/output data.
 *
 * See the {@glink features/markdown Markdown output} guide to learn more on how to enable it.
 */

export default class MDDataProcessor implements DataProcessor {
	/**
	 * HTML data processor used to process HTML produced by the Markdown-to-HTML converter and the other way.
	 */
	private _htmlDP: HtmlDataProcessor;

	/**
	 * Helper for converting Markdown to HTML.
	 */
	private _markdown2html: MarkdownToHtml;

	/**
	 * Helper for converting HTML to Markdown.
	 */
	private _html2markdown: HtmlToMarkdown;

	/**
	 * Creates a new instance of the Markdown data processor class.
	 */
	constructor( editor: Editor ) {
		this._htmlDP = new HtmlDataProcessor( editor.data.viewDocument );
		this._markdown2html = new MarkdownToHtml( editor.config.get( 'markdown.toView' ) as MarkdownToHtmlConfig );
		this._html2markdown = new HtmlToMarkdown( editor.config.get( 'markdown.toData' ) as Record<HtmlElementName, string> );
	}

	/**
	 * Keeps the specified element in the output as HTML. This is useful if the editor contains
	 * features producing HTML that is not a part of the Markdown standard.
	 *
	 * By default, all HTML tags are removed.
	 *
	 * @param element The element name to be kept.
	 */
	public keepHtml( element: keyof HTMLElementTagNameMap ): void {
		this._html2markdown.keep( [ element ] );
	}

	/**
	 * Converts the provided Markdown string to a view tree.
	 *
	 * @param data A Markdown string.
	 * @returns The converted view element.
	 */
	public toView( data: string ): ViewDocumentFragment {
		const html = this._markdown2html.parse( data );
		return this._htmlDP.toView( html );
	}

	/**
	 * Converts the provided {@link module:engine/view/documentfragment~DocumentFragment} to data format &ndash; in this
	 * case to a Markdown string.
	 *
	 * @returns Markdown string.
	 */
	public toData( viewFragment: ViewDocumentFragment ): string {
		const html = this._htmlDP.toData( viewFragment );
		return this._html2markdown.parse( html );
	}

	/**
	 * Registers a {@link module:engine/view/matcher~MatcherPattern} for view elements whose content should be treated as raw data
	 * and not processed during the conversion from Markdown to view elements.
	 *
	 * The raw data can be later accessed by a
	 * {@link module:engine/view/element~Element#getCustomProperty custom property of a view element} called `"$rawContent"`.
	 *
	 * @param pattern The pattern matching all view elements whose content should
	 * be treated as raw data.
	 */
	public registerRawContentMatcher( pattern: MatcherPattern ): void {
		this._htmlDP.registerRawContentMatcher( pattern );
	}

	/**
	 * This method does not have any effect on the data processor result. It exists for compatibility with the
	 * {@link module:engine/dataprocessor/dataprocessor~DataProcessor `DataProcessor` interface}.
	 */
	public useFillerType(): void {}
}
