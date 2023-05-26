using ms_adminService as service from '../../srv/mailservice';

annotate service.whitelists with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'addressArea',
            Value : addressArea,
        },
    ]
);
annotate service.whitelists with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'addressArea',
                Value : addressArea,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
