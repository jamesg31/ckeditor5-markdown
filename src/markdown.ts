import { Plugin, type Editor } from 'ckeditor5';
import MDDataProcessor from './mddataprocessor.js';

export default class Markdown extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor: Editor ) {
		super( editor );

		editor.data.processor = new MDDataProcessor( editor );
	}

	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'BetterMarkdown' as const;
	}
}
