Schemas = {};

Schemas.Advice = new SimpleSchema({
    adviser: {
        type: String,
        autoValue: () => Meteor.userId(),
        autoform: {
            afFieldInput: {
                type: 'hidden'
            },
            omit: true
        }
    },
    advisee: {
        type: String,
        optional: true,
        label: "Who's this advice for?"

    },
    created_at: {
        type: Date,
        autoValue: () => new Date(),
        autoform: {
            omit: true
        }
    },
    advice: {
        type: String,
        label: "What's your advice?"
    },
    description: {
        type: String,
        label: 'Why does this advice matters?',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    },
    when: {
        type: Date,
        optional: true,
        label: 'When is the best time for this advice?'
    }
});

Schemas.Profile = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        optional: true
    },
    family: {
        type: Array,
        // label: 'My Family',
        optional: true
    },
    'family.$': {
        type: Object,
        // label: 'Family Member'
    },
    'family.$.name': {
        type: String,
        label: 'Name'
    },
    'family.$.gender': {
        type: String,
        label: 'Gender',
        allowedValues: ['male', 'female', 'other/nd'],
        autoform: {
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
                { label: 'I prefer not to say', value: 'rather-not' },
            ],
        }
    },
    'family.$.birhdate': {
        type: Date,
        label: 'Date of Birth'
    },
    'family.$.relationship': {
        type: String,
        allowedValues: ['child', 'father', 'mother', 'sibling', 'other'],
        autoform: {
            options: [
                { label: 'Child', value: 'child' },
                { label: 'Father', value: 'father' },
                { label: 'Mother', value: 'mother' },
                { label: 'Sibling', value: 'sibling' },
                { label: 'Other', value: 'other' },
            ],
        }
    }
});

Advices = new Mongo.Collection('Advices');
Advices.attachSchema(Schemas.Advice);