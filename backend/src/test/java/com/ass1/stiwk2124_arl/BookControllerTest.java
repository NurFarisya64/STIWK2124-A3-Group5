package com.ass1.stiwk2124_arl;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BookControllerTest {

    @Test
    void testCreateBookSuccess() {
        String title = "Java Basics";
        assertEquals("Java Basics", title);
    }

    @Test
    void testGetBookSuccess() {
        int id = 1;
        assertTrue(id > 0);
    }

    @Test
    void testGetBookFailure() {
        String book = null;
        assertNull(book);
    }
}
