/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Config, } from "./config/config";
import { Environment, } from "./config/environment";
import { HttpClient, } from "@vertexvis/network";
import { Credentials, } from "./credentials/credentials";
import { TapEventDetails, } from "./interactions/tapEventDetails";
import { FrameAttributes, ImageStreamingClient, } from "./image-streaming-client";
import { Disposable, } from "./utils";
import { CommandFactory, StreamingClients, } from "./commands/command";
import { InteractionHandler, } from "./interactions/interactionHandler";
import { SceneBuilder, } from "./scenes/sceneBuilder";
import { Scene, } from "./scenes/scene";
import { LoadModelResponse, } from "./commands/streamCommands";
export namespace Components {
    interface SvgIcon {
    }
    interface VertexViewer {
        /**
          * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
         */
        "cameraControls": boolean;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "config"?: Config | string;
        /**
          * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
          * @see Viewer.config
         */
        "configEnv": Environment;
        /**
          * A `Credentials` object or JSON encoded string of a `Credentials` object. The viewer must set this property or a combination of `credentialsClientId`, `credentialsToken` and `credentialsApiKey`. This property will take precedence.
         */
        "credentials"?: Credentials | string;
        /**
          * The api key for a user token credentials flow.
         */
        "credentialsApiKey"?: string;
        /**
          * The client ID for an Oauth2 credentials flow. `credentialsToken` must also be set.
         */
        "credentialsClientId"?: string;
        /**
          * The token for an Oauth2 credentials flow. Property is ignored if `credentialsClientId` has not been set.
         */
        "credentialsToken"?: string;
        "getFrameAttributes": () => Promise<FrameAttributes>;
        "getInteractionHandlers": () => Promise<InteractionHandler[]>;
        /**
          * @private Used internally for testing.
         */
        "httpClient": HttpClient.HttpClient;
        /**
          * Loads the given resource into the viewer and return a `Promise` that resolves when the scene has been loaded. The specified resource is a URN in one of the following formats:    * `urn:vertexvis:eedc:file:<fileid>`   * `urn:vertexvis:eedc:scenestate:<scenestateid>`   * `urn:vertexvis:eedc:file?externalId=<externalId>`   * `urn:vertexvis:platform:scene:<sceneid>`
          * @param resource The URN of the resource to load.
         */
        "load": (resource: string) => Promise<void>;
        /**
          * A URN of the model resource to load when the component is mounted in the DOM tree. The specified resource is a URN in one of the following formats:    * `urn:vertexvis:eedc:file:<fileid>`   * `urn:vertexvis:eedc:scenestate:<scenestateid>`   * `urn:vertexvis:eedc:file?externalId=<externalId>`   * `urn:vertexvis:platform:scene:<sceneid>`
         */
        "model"?: string;
        /**
          * Returns a `SceneBuilder` that is used to create a scene before viewing. A `SceneBuilder` provides a fluent interface to specify what file or scene to base the new scene off of, as well as operations to modify the new scene.
          * @example const viewer = document.querySelector(".viewer");  const newScene = await viewer.newScene(); newScene.from('urn:vertexvis:eedc:file:123)   .highlight('#ff0000', s => s.withMetadata('Name', 'arm_SOLID_SOLIDS'))   .execute()   .then(scene => viewer.load(scene));
         */
        "newScene": () => Promise<SceneBuilder>;
        /**
          * Internal API.
          * @private
         */
        "registerCommand": <R, T, S extends StreamingClients = ImageStreamingClient>(id: string, factory: CommandFactory<R, S>, thisArg?: T) => Promise<Disposable>;
        /**
          * Registers and initializes an interaction handler with the viewer. Returns a `Disposable` that should be used to deregister the interaction handler.  `InteractionHandler`s are used to build custom mouse and touch interactions for the viewer. Use `<vertex-viewer camera-controls="false" />` to disable the default camera controls provided by the viewer.
          * @example class CustomInteractionHandler extends InteractionHandler {   private element: HTMLElement;   private api: InteractionApi;    public dispose(): void {     this.element.removeEventListener('click', this.handleElementClick);   }    public initialize(element: HTMLElement, api: InteractionApi): void {     this.api = api;     this.element = element;     this.element.addEventListener('click', this.handleElementClick);   }    private handleElementClick = (event: MouseEvent) => {     api.tap({ x: event.clientX, y: event.clientY });   } }  const viewer = document.querySelector("vertex-viewer"); viewer.registerInteractionHandler(new CustomInteractionHandler);
          * @param interactionHandler The interaction handler to register.
          * @returns - A promise containing the disposable to use to deregister the handler.
         */
        "registerInteractionHandler": (interactionHandler: InteractionHandler) => Promise<Disposable>;
        /**
          * Returns a `Scene` that contains methods for performing operations on the loaded scene. If a scene has not been loaded, then this method will throw an exception.
          * @example const viewer = document.querySelector(".viewer");  const scene = await viewer.scene(); scene   .highlight('#ff0000', s => s.withMetadata('Name', 'arm_SOLID_SOLIDS'))   .execute()
         */
        "scene": () => Promise<Scene>;
    }
    interface VertexViewerToolbar {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface VertexViewerViewCube {
        /**
          * @private
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarCameraTools {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarDivider {
    }
    interface ViewerToolbarFitAllTool {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarGroup {
    }
    interface ViewerToolbarItem {
        /**
          * Whether this element should be displayed with conditional styling for a selected toolbar item.
         */
        "selected"?: boolean;
    }
    interface ViewerToolbarPanTool {
        "selected"?: boolean;
    }
    interface ViewerToolbarRotateTool {
        /**
          * Whether to display conditional selected state styling to this tool's icon.
         */
        "selected"?: boolean;
    }
    interface ViewerToolbarZoomTool {
        /**
          * Whether to display conditional selected state styling to this tool's icon.
         */
        "selected"?: boolean;
    }
}
declare global {
    interface HTMLSvgIconElement extends Components.SvgIcon, HTMLStencilElement {
    }
    var HTMLSvgIconElement: {
        prototype: HTMLSvgIconElement;
        new (): HTMLSvgIconElement;
    };
    interface HTMLVertexViewerElement extends Components.VertexViewer, HTMLStencilElement {
    }
    var HTMLVertexViewerElement: {
        prototype: HTMLVertexViewerElement;
        new (): HTMLVertexViewerElement;
    };
    interface HTMLVertexViewerToolbarElement extends Components.VertexViewerToolbar, HTMLStencilElement {
    }
    var HTMLVertexViewerToolbarElement: {
        prototype: HTMLVertexViewerToolbarElement;
        new (): HTMLVertexViewerToolbarElement;
    };
    interface HTMLVertexViewerViewCubeElement extends Components.VertexViewerViewCube, HTMLStencilElement {
    }
    var HTMLVertexViewerViewCubeElement: {
        prototype: HTMLVertexViewerViewCubeElement;
        new (): HTMLVertexViewerViewCubeElement;
    };
    interface HTMLViewerToolbarCameraToolsElement extends Components.ViewerToolbarCameraTools, HTMLStencilElement {
    }
    var HTMLViewerToolbarCameraToolsElement: {
        prototype: HTMLViewerToolbarCameraToolsElement;
        new (): HTMLViewerToolbarCameraToolsElement;
    };
    interface HTMLViewerToolbarDividerElement extends Components.ViewerToolbarDivider, HTMLStencilElement {
    }
    var HTMLViewerToolbarDividerElement: {
        prototype: HTMLViewerToolbarDividerElement;
        new (): HTMLViewerToolbarDividerElement;
    };
    interface HTMLViewerToolbarFitAllToolElement extends Components.ViewerToolbarFitAllTool, HTMLStencilElement {
    }
    var HTMLViewerToolbarFitAllToolElement: {
        prototype: HTMLViewerToolbarFitAllToolElement;
        new (): HTMLViewerToolbarFitAllToolElement;
    };
    interface HTMLViewerToolbarGroupElement extends Components.ViewerToolbarGroup, HTMLStencilElement {
    }
    var HTMLViewerToolbarGroupElement: {
        prototype: HTMLViewerToolbarGroupElement;
        new (): HTMLViewerToolbarGroupElement;
    };
    interface HTMLViewerToolbarItemElement extends Components.ViewerToolbarItem, HTMLStencilElement {
    }
    var HTMLViewerToolbarItemElement: {
        prototype: HTMLViewerToolbarItemElement;
        new (): HTMLViewerToolbarItemElement;
    };
    interface HTMLViewerToolbarPanToolElement extends Components.ViewerToolbarPanTool, HTMLStencilElement {
    }
    var HTMLViewerToolbarPanToolElement: {
        prototype: HTMLViewerToolbarPanToolElement;
        new (): HTMLViewerToolbarPanToolElement;
    };
    interface HTMLViewerToolbarRotateToolElement extends Components.ViewerToolbarRotateTool, HTMLStencilElement {
    }
    var HTMLViewerToolbarRotateToolElement: {
        prototype: HTMLViewerToolbarRotateToolElement;
        new (): HTMLViewerToolbarRotateToolElement;
    };
    interface HTMLViewerToolbarZoomToolElement extends Components.ViewerToolbarZoomTool, HTMLStencilElement {
    }
    var HTMLViewerToolbarZoomToolElement: {
        prototype: HTMLViewerToolbarZoomToolElement;
        new (): HTMLViewerToolbarZoomToolElement;
    };
    interface HTMLElementTagNameMap {
        "svg-icon": HTMLSvgIconElement;
        "vertex-viewer": HTMLVertexViewerElement;
        "vertex-viewer-toolbar": HTMLVertexViewerToolbarElement;
        "vertex-viewer-view-cube": HTMLVertexViewerViewCubeElement;
        "viewer-toolbar-camera-tools": HTMLViewerToolbarCameraToolsElement;
        "viewer-toolbar-divider": HTMLViewerToolbarDividerElement;
        "viewer-toolbar-fit-all-tool": HTMLViewerToolbarFitAllToolElement;
        "viewer-toolbar-group": HTMLViewerToolbarGroupElement;
        "viewer-toolbar-item": HTMLViewerToolbarItemElement;
        "viewer-toolbar-pan-tool": HTMLViewerToolbarPanToolElement;
        "viewer-toolbar-rotate-tool": HTMLViewerToolbarRotateToolElement;
        "viewer-toolbar-zoom-tool": HTMLViewerToolbarZoomToolElement;
    }
}
declare namespace LocalJSX {
    interface SvgIcon {
    }
    interface VertexViewer {
        /**
          * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
         */
        "cameraControls"?: boolean;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "config"?: Config | string;
        /**
          * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
          * @see Viewer.config
         */
        "configEnv"?: Environment;
        /**
          * A `Credentials` object or JSON encoded string of a `Credentials` object. The viewer must set this property or a combination of `credentialsClientId`, `credentialsToken` and `credentialsApiKey`. This property will take precedence.
         */
        "credentials"?: Credentials | string;
        /**
          * The api key for a user token credentials flow.
         */
        "credentialsApiKey"?: string;
        /**
          * The client ID for an Oauth2 credentials flow. `credentialsToken` must also be set.
         */
        "credentialsClientId"?: string;
        /**
          * The token for an Oauth2 credentials flow. Property is ignored if `credentialsClientId` has not been set.
         */
        "credentialsToken"?: string;
        /**
          * @private Used internally for testing.
         */
        "httpClient": HttpClient.HttpClient;
        /**
          * A URN of the model resource to load when the component is mounted in the DOM tree. The specified resource is a URN in one of the following formats:    * `urn:vertexvis:eedc:file:<fileid>`   * `urn:vertexvis:eedc:scenestate:<scenestateid>`   * `urn:vertexvis:eedc:file?externalId=<externalId>`   * `urn:vertexvis:platform:scene:<sceneid>`
         */
        "model"?: string;
        /**
          * Emits an event when a frame has been drawn to the viewer's canvas. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
         */
        "onFrameDrawn"?: (event: CustomEvent<FrameAttributes>) => void;
        /**
          * Emits an event when a frame has been received by the viewer. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
         */
        "onFrameReceived"?: (event: CustomEvent<FrameAttributes>) => void;
        /**
          * Emits an event whenever the user taps or clicks a location in the viewer. The event includes the location of the tap or click, which can be used to perform an operation on the bom item at that position.
         */
        "onTap"?: (event: CustomEvent<TapEventDetails>) => void;
        /**
          * Emits an event when a provided oauth2 token is about to expire, or is about to expire, causing issues with establishing a websocket connection, or performing API calls.
         */
        "onTokenExpired"?: (event: CustomEvent<void>) => void;
    }
    interface VertexViewerToolbar {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface VertexViewerViewCube {
        /**
          * @private
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarCameraTools {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarDivider {
    }
    interface ViewerToolbarFitAllTool {
        /**
          * The `vertex-viewer` component that this toolbar will interact with. This property can be injected by the `vertex-viewer` when a `data-viewer="{{viewer element id}}"` attribute is present.
         */
        "viewer"?: HTMLVertexViewerElement;
    }
    interface ViewerToolbarGroup {
    }
    interface ViewerToolbarItem {
        /**
          * Whether this element should be displayed with conditional styling for a selected toolbar item.
         */
        "selected"?: boolean;
    }
    interface ViewerToolbarPanTool {
        "selected"?: boolean;
    }
    interface ViewerToolbarRotateTool {
        /**
          * Whether to display conditional selected state styling to this tool's icon.
         */
        "selected"?: boolean;
    }
    interface ViewerToolbarZoomTool {
        /**
          * Whether to display conditional selected state styling to this tool's icon.
         */
        "selected"?: boolean;
    }
    interface IntrinsicElements {
        "svg-icon": SvgIcon;
        "vertex-viewer": VertexViewer;
        "vertex-viewer-toolbar": VertexViewerToolbar;
        "vertex-viewer-view-cube": VertexViewerViewCube;
        "viewer-toolbar-camera-tools": ViewerToolbarCameraTools;
        "viewer-toolbar-divider": ViewerToolbarDivider;
        "viewer-toolbar-fit-all-tool": ViewerToolbarFitAllTool;
        "viewer-toolbar-group": ViewerToolbarGroup;
        "viewer-toolbar-item": ViewerToolbarItem;
        "viewer-toolbar-pan-tool": ViewerToolbarPanTool;
        "viewer-toolbar-rotate-tool": ViewerToolbarRotateTool;
        "viewer-toolbar-zoom-tool": ViewerToolbarZoomTool;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "svg-icon": LocalJSX.SvgIcon & JSXBase.HTMLAttributes<HTMLSvgIconElement>;
            "vertex-viewer": LocalJSX.VertexViewer & JSXBase.HTMLAttributes<HTMLVertexViewerElement>;
            "vertex-viewer-toolbar": LocalJSX.VertexViewerToolbar & JSXBase.HTMLAttributes<HTMLVertexViewerToolbarElement>;
            "vertex-viewer-view-cube": LocalJSX.VertexViewerViewCube & JSXBase.HTMLAttributes<HTMLVertexViewerViewCubeElement>;
            "viewer-toolbar-camera-tools": LocalJSX.ViewerToolbarCameraTools & JSXBase.HTMLAttributes<HTMLViewerToolbarCameraToolsElement>;
            "viewer-toolbar-divider": LocalJSX.ViewerToolbarDivider & JSXBase.HTMLAttributes<HTMLViewerToolbarDividerElement>;
            "viewer-toolbar-fit-all-tool": LocalJSX.ViewerToolbarFitAllTool & JSXBase.HTMLAttributes<HTMLViewerToolbarFitAllToolElement>;
            "viewer-toolbar-group": LocalJSX.ViewerToolbarGroup & JSXBase.HTMLAttributes<HTMLViewerToolbarGroupElement>;
            "viewer-toolbar-item": LocalJSX.ViewerToolbarItem & JSXBase.HTMLAttributes<HTMLViewerToolbarItemElement>;
            "viewer-toolbar-pan-tool": LocalJSX.ViewerToolbarPanTool & JSXBase.HTMLAttributes<HTMLViewerToolbarPanToolElement>;
            "viewer-toolbar-rotate-tool": LocalJSX.ViewerToolbarRotateTool & JSXBase.HTMLAttributes<HTMLViewerToolbarRotateToolElement>;
            "viewer-toolbar-zoom-tool": LocalJSX.ViewerToolbarZoomTool & JSXBase.HTMLAttributes<HTMLViewerToolbarZoomToolElement>;
        }
    }
}
