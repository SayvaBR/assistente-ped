package br.com.assistentepedagogico.app;

final class WindowInsetsCssBridge {

    private WindowInsetsCssBridge() {}

    static int toCssPixels(int physicalPixels, float density) {
        if (density <= 0f) {
            return physicalPixels;
        }
        return Math.round(physicalPixels / density);
    }
}
