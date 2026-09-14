package br.com.assistentepedagogico.app;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class WindowInsetsCssBridgeTest {

    @Test
    public void convertsPhysicalInsetToCssLogicalPixels() {
        assertEquals(24, WindowInsetsCssBridge.toCssPixels(72, 3f));
    }

    @Test
    public void preservesInsetWhenDensityIsUnavailable() {
        assertEquals(18, WindowInsetsCssBridge.toCssPixels(18, 0f));
    }
}
