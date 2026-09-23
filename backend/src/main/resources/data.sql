/*
 Provides demonstration data.
 Contains data rows only.
 */
-- Sample elderly participants
INSERT INTO
    elderly (name, age, mobility_level, notes)
VALUES
    (
        'Maria Jansen',
        82,
        'MEDIUM',
        'Uses a walking cane'
    );

INSERT INTO
    elderly (name, age, mobility_level, notes)
VALUES
    ('Jan de Vries', 76, 'HIGH', 'Very active');

INSERT INTO
    elderly (name, age, mobility_level, notes)
VALUES
    (
        'Els Bakker',
        88,
        'LOW',
        'Requires frequent breaks'
    );

-- Sample volunteers
INSERT INTO
    volunteer (name)
VALUES
    ('Thomas Visser');

INSERT INTO
    volunteer (name)
VALUES
    ('Emma Smit');

INSERT INTO
    volunteer (name)
VALUES
    ('Lucas Bos');

-- Sample walks
INSERT INTO
    walk (
        elderly_id,
        volunteer_id,
        walk_date,
        duration_minutes,
        distance_km,
        pain_mood,
        notes
    )
VALUES
    (
        1,
        1,
        DATE '2026-09-15',
        30,
        1.50,
        4,
        'Pleasant walk in the park'
    );

INSERT INTO
    walk (
        elderly_id,
        volunteer_id,
        walk_date,
        duration_minutes,
        distance_km,
        pain_mood,
        notes
    )
VALUES
    (
        2,
        2,
        DATE '2026-09-16',
        45,
        3.20,
        5,
        'Excellent condition'
    );

INSERT INTO
    walk (
        elderly_id,
        volunteer_id,
        walk_date,
        duration_minutes,
        distance_km,
        pain_mood,
        notes
    )
VALUES
    (
        3,
        3,
        DATE '2026-09-17',
        20,
        0.80,
        2,
        'Needed several breaks'
    );