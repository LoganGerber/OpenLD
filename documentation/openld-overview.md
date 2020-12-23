# OpenLD Overview

OpenLD (short for Open Lighting Designer) is a stage lighting control platform.

## UI/UX Philosophy

The philosophy behind the UI/UX design for the software is as follows:
* Intuitiveness - The software should be designed with the idea that people with zero experience in lighting design should be able to understand the software and get started making basic programs within 30-60 minutes.
* Customizability - The software should allow for the user to optimize their workflow by allowing customizations of things such as, but not limited to, the window layout, views/information available to the user, and keyboard shortcuts.
* Digestability - The software should be readable so a user can easily understand what is being shown to them.

## Working With DMX Devices

The user will be able to specify what kinds of DMX-enabled devices they will be working with for a show, as well as (optionally) providing a location for OpenLD to find them.

Profiles for DMX devices can be registered, loaded, and created, that will contain information the different channels a device has, as well as documentation for the channels. Profiles can also be unregistered, to recover hard drive space when a user no longer needs to keep profiles on specific DMX devices.


## Working with OpenLD

When programming shows using DMX devices, the devices must be put into `Groups`. A `Group` is a collection of one or more DMX devices, and is what the user will be interacting with most of the time when creating show.

When programming a show, users will bring `Groups` into the `Timeline`. A copy of a group brought into the `Timeline` is called a `Group Instance`. If the same `Group` is brought into the `Timeline` again, a second `Group Instance` is created, separate from the first.

`Group Instances` are wired together in a graph structure, showing how they lead into one another forming a show.

## UI Aspects

### Preview Area
This area shows a live view of what the show looks like, rendered in 3D. The user will be able to import a 3D model of their stage area to preview in here, and plan how the different DMX devices interract with the stage. The DMX devices can also come with 3D models, which can be moved around in this section to lay them out how they will be layed out on the stage.

### Device List
List of all available DMX devices, as well as DMX device groups.

### Context Area
Area that changes depending on what item the user has selected. It will show all relevant data related to the item the user has selected. For example, if a DMX device is selected, a list of channels along with documentation for the channels is displayed. If a DMX device inside a `Group Instance` is selected, the user will be able to edit what the device does inside this `Group Instance`. If a `Group Instance` is selected, data regarding the `Group Instance` is displayed, as well as form fields to let the user change it.

### Timeline
Area that shows the graph of `Group Instances`, and how they link together to form a single show.
