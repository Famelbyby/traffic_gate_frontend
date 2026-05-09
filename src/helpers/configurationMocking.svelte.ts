import type { Configuration } from "~/types/configuration";

let CONFIGURATION_MOCK = $state('JOPA\n{\n\tOKAK\n}');

export function getConfigurationMock() {
    return CONFIGURATION_MOCK;
}

export function setConfigurationMock(data: Configuration) {
    CONFIGURATION_MOCK = data;
}