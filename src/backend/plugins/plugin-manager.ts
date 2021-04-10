import { PathLike } from "fs";

type PluginInfo = {
	name: string;
	packageInfo: Object;
};

class _PluginManager {
	private loadedPlugins: Array<PluginInfo>;

	// ask for a list of activated plugins (name)
	// ask for a list of installed plugins (name)
	// get a plugin's package.json
	// check if a plugin is activated by name
	// check if a plugin is installed by name
	// install plugin from file
	// uninstall plugin
	// activate plugin
	// deactivate plugin
	// load plugin (register its info into the PluginManager)
	// load plugins from plugin directory (relative to show and global)
	// unload plugin (remove its info from the PluginManager)

	public GetLoadedPlugins(): Array<string> {
		return this.loadedPlugins.map(x => x.name);
	}

	// public GetActivePlugins(): Array<string> {

	// }

	public GetPluginInfo(pluginName: string): Object | undefined {
		return this.loadedPlugins.find(x => x.name === pluginName)?.packageInfo;
	}

	// public IsActive(pluginName: string): boolean {

	// }

	public IsInstalled(pluginName: string): boolean {
		return this.loadedPlugins.find(x => x.name === pluginName) !== undefined;
	}

	// public InstallPlugin(path: PathLike) {

	// }

	// public UninstallPlugin(pluginName: string) {

	// }

	// public ActivatePlugin(pluginName: string) {

	// }

	// public DeactivatePlugin(pluginName: string) {

	// }

	public LoadPlugin
}
