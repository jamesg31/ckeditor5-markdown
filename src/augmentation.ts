import type { Markdown, PasteFromMarkdownExperimental } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Markdown.pluginName ]: Markdown;
		[ PasteFromMarkdownExperimental.pluginName ]: PasteFromMarkdownExperimental;
	}
}
