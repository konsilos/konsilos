Meteor.startup(() => {
    Meteor.subscribe('Advices');
});

////////////////////
// Template helpers:
////////////////////

Template.AdviceListing.helpers({
    list: () => Collections.Advices.find({}, { sort: { advice: 1 }}),
    fromNow: when => moment(when).fromNow()
});

Template.AdviceForm.helpers({
    adviseeOptions: () => {
        const familyMembers = Meteor.user() && Meteor.user().profile.family || [];
        const familyMembersOptions = familyMembers.map(member => {
            return {
                label: `${member.name}`,
                value: member.id,
                icon: 'users icon',
                description: member.relationship.capitalizeFirstLetter()
            }
        });
        const otherOptions = [
            { label: 'My future child', value: 'future-child', icon: 'wait icon' },
            { label: 'A future someone', value: 'future-someone', icon: 'wait icon' },
            { label: 'Add a new family member...', value: 'add-new-family-member', icon: 'add user icon' }
        ];

        const finalOptions = familyMembersOptions.concat([{
            itemGroup: 'Not here yet:',
            items: otherOptions
        }]);

        return finalOptions;
    },

    whenOptions: () => {
        // Quando <label> completar a idade _______
        // Especificamente na data...
        // Em um momento marcante [formatura, 1º dia de aula, 1ª namoradinha, 1ª decepção amorosa, Quero adicionar um outro momento]

        const options = [
            {
                category: { value: 'specific-age', label: 'When ____ turns __ yearls old' },
                items: _.range(100)
            }
        ];

        return options;
    }
});

Template.AdviceForm.onRendered(function() {
    this.$('.when').dropdown();

    const addFamilyModal = this.$('.family-member')
        .modal('setting', 'transition', 'scale')
        .modal('attach events', '.positive.button', 'hide');

    this.$('.advisee').dropdown({
        onChange: newValue => {
            // TODO: make an unit test for ensuring the following value correctness:
            if (newValue === 'add-new-family-member') {
                addFamilyModal.modal('show');
            }
        }
    });
});
